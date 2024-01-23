import { partition } from "@lib/helpers/array-helpers";
import { round } from "@lib/helpers/number-helpers";
import { Member, Payment, TransactionType } from "@lib/types";

/**
 * Optimizes debt settlements within a group by minimizing the number of transactions required.
 *
 * @param {Member[]} groupMembers - An array of members in the group, each with a `user_id` and `balance` property.
 * @returns {Partial<Payment>[]} - An array of simplified payment transactions reflecting the debt settlements,
 *   containing only the `type`, `from_user`, `to_user`, and `amount` properties.
 */
export default function simplifyDebts(
	groupMembers: Member[]
): Partial<Payment>[] {
	// Calculate balances for each user
	const [creditors, debtors] = partition(
		groupMembers,
		(item) => item.balance > 0
	);

	// If there's only one creditor, simply create due payments from each debtor to that creditor
	if (creditors.length === 1) {
		const creditor = creditors[0];

		return debtors
			.filter((debtor) => Math.abs(debtor.balance) > 0)
			.map((debtor) => ({
				type: TransactionType.PAYMENT,
				from_user: debtor.user_id,
				to_user: creditor.user_id,
				amount: round(Math.abs(debtor.balance)),
			}));
	}

	const result: Partial<Payment>[] = [];

	for (const debtor of debtors) {
		let remainingDebt = Math.abs(debtor.balance);
		// debtor goes through every creditor to find the best fit

		for (const creditor of creditors) {
			// The debtor's debt can be fully covered by a creditor
			if (round(creditor.balance) >= round(remainingDebt)) {
				creditor.balance -= remainingDebt; // decrease creditor amount
				// Create a transaction for the full debt amount
				result.push({
					type: TransactionType.PAYMENT,
					from_user: debtor.user_id,
					to_user: creditor.user_id,
					amount: round(remainingDebt),
				});
				// Debt is settled
				remainingDebt = 0;
				break; // Exit the creditor loop as the debt is settled.
			}
		}

		if (remainingDebt === 0) {
			continue;
		}

		// The debt wasn't fully covered in the previous loop,
		// distribute among remaining creditors
		for (const creditor of creditors) {
			if (creditor.balance === 0) {
				continue;
			}
			let amount: number;
			// Determine the transaction amount based on remaining debts
			if (round(remainingDebt) >= round(creditor.balance)) {
				remainingDebt -= creditor.balance;
				amount = creditor.balance;
			} else {
				creditor.balance -= remainingDebt;
				amount = remainingDebt;
			}
			// Create a transaction for the partial debt payment
			result.push({
				type: TransactionType.PAYMENT,
				from_user: debtor.user_id,
				to_user: creditor.user_id,
				amount: round(amount),
			});
		}
	}

	return result;
}
