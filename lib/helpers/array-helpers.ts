import groupBy from "object.groupby";
import {
	Expense,
	ExpenseDetailParticipant,
	Payment,
	Transactions,
} from "../types";

/**
 * Partitions an array into two sub-arrays based on a callback function.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to partition.
 * @param {(element: T, index: number, array: T[]) => boolean} callback - A function
 *   that takes an element, its index, and the original array, and returns `true` if the
 *   element should be placed in the first sub-array, or `false` for the second sub-array.
 * @returns {T[][]} - An array containing two sub-arrays:
 *   - The first sub-array contains elements for which the callback returned `true`.
 *   - The second sub-array contains elements for which the callback returned `false`.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const [evens, odds] = partition(numbers, (num) => num % 2 === 0);
 * console.log(evens); // Output: [2, 4]
 * console.log(odds); // Output: [1, 3, 5]
 */
export function partition<T>(
	array: T[],
	callback: (element: T, index: number, array: T[]) => boolean
) {
	return array.reduce(
		function (result: T[][], element, i) {
			callback(element, i, array)
				? result[0].push(element)
				: result[1].push(element);

			return result;
		},
		[[], []]
	);
}

/**
 * Maps a collection of transactions into an array with interleaved dates, sorted descendingly by timestamp.
 *
 * @param {Transactions} transactions - An array of transaction objects, including both expenses and payments.
 * @returns {(Expense | Payment | string)[]} An array with transaction objects (expenses or payments) and date strings, where dates are inserted as delimiters between transactions of different dates, sorted most recent first.
 */
export function mapTransactions(
	transactions: Transactions
): (Expense | Payment | string)[] {
	return Object.entries(groupBy(transactions, (tx) => tx.date))
		.sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) // Sort by timestamps descending
		.flatMap(([date, txs]) => [date, ...txs]);
}

/**
 * Maps a collection of participants into an array with titles.
 *
 * @param participants - An array of participant objects.
 * @returns An array with participant objects and title strings.
 */
export function mapParticipants(
	participants: ExpenseDetailParticipant[]
): (ExpenseDetailParticipant | string)[] {
	const payers = participants
		.filter((participant) => participant.credit! > 0)
		.map((item) => ({ ...item, debt: undefined }));
	const debtors = participants
		.filter((participant) => participant.debt! > 0)
		.map((item) => ({ ...item, credit: undefined }));

	return [
		"Pagado por:",
		...payers.sort((a, b) => b.credit! - a.credit!),
		"Dividido entre:",
		...debtors.sort((a, b) => b.debt! - a.debt!),
	];
}

/**
 * Moves an element with a matching value for a given property to the front of the array.
 *
 * @param data An array of objects.
 * @param matchingValue The value to match against.
 * @param propertyName The name of the property to check for the matching value.
 * @returns A new array with the matching element at the front, or the original array if no match is found.
 */
export function moveToFront<T, K extends keyof T>(
	data: T[],
	matchingValue: T[K],
	propertyName: K
): T[] {
	const index = data.findIndex(
		({ [propertyName]: value }: T) => value === matchingValue
	);

	if (index !== -1) {
		return [data[index], ...data.slice(0, index), ...data.slice(index + 1)];
	}

	return data;
}
