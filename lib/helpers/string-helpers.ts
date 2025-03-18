import useExpenseStore from "@lib/expense-store";
import { formatCurrencyRounded } from "@lib/helpers/number-formatter";
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
	userId: UserID | undefined;
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

/**
 * Capitalizes the first letter of a given string.
 *
 * @param str - The string to capitalize.
 * @returns The string with the first letter capitalized.
 * @example
 * const capitalizedString = capitalizeFirstLetter('hello world');
 * console.log(capitalizedString); // Output: 'Hello world'
 */
export function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Interface representing the context for participant description generation.
 */
interface ParticipantContext {
	members: Member[] | undefined;
	userId: UserID | undefined;
	type: "payers" | "debtors";
}

/**
 * Generates a human-readable string representing expense participants, considering the user's perspective and context.
 *
 * @param context - Object containing information about members, user ID, and participant type.
 * @returns  A string describing the expense participants in a user-friendly format.
 */
export function getParticipants({
	members = [],
	userId,
	type,
}: ParticipantContext) {
	if (!userId) {
		return;
	}
	const amount = useExpenseStore.getState().amount;
	let ids: UserID[] = useExpenseStore.getState().getActiveParticipants(type);

	if (ids.length === 0) {
		if (!!amount) {
			return type === "payers" ? "Paga dios?" : "No participó nadie?";
		} else {
			return type === "payers" ? "Vos" : "Todos";
		}
	}

	if (ids.length === members.length) {
		return "Todos";
	}

	if (ids.includes(userId)) {
		switch (ids.length) {
			case 1:
				return "Vos";
			case 2:
				return `Vos y 1 miembro más`;
			default:
				return `Vos y ${ids.length - 1} miembros más`;
		}
	}

	if (ids.length === 1) {
		return members.find((participant) => participant.user_id === ids[0])
			?.profile.name;
	}

	if (ids.length > 1) {
		return `${ids.length} miembros`;
	}
}
