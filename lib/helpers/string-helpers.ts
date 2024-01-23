import { formatCurrencyRounded } from "@lib/number-formatter";
import { ExpenseParticipant, Member, UserID } from "@lib/types";

/**
 * Formats a descriptive label for an expense, considering the payers, amount, and user's involvement.
 *
 * @param {object} params - An object containing expense details.
 * @param {ExpenseParticipant[]} params.payers - Array of expense participants who paid for the expense.
 * @param {Member[]} params.members - Array of group members.
 * @param {number} params.amount - The total amount of the expense.
 * @param {UserID} params.userId - The ID of the current user.
 * @param {number} params.userCredit - The amount the current user contributed (if any).
 * @returns {string} The formatted expense label, providing context about the payment.
 */
export function formatExpenseLabel({
	payers,
	members,
	amount,
	userId,
	userCredit,
}: {
	payers: ExpenseParticipant[];
	members: Member[];
	amount: number;
	userId: UserID;
	userCredit: number;
}) {
	const payersIds: string[] = [];
	const formattedAmount = formatCurrencyRounded(amount);

	for (const { user_id, amount } of payers) {
		if (amount > 0) {
			payersIds.push(user_id);
		}
	}

	if (payersIds.length > 1) {
		return `Entre ${payersIds.length} pagaron ${formattedAmount}`;
	}

	if (userCredit > 0) {
		return `Pagaste ${formattedAmount}`;
	}

	const payerName = members.find((member) => member.user_id === userId)
		?.profile.name;

	return `${payerName} pagó ${formattedAmount}`;
}