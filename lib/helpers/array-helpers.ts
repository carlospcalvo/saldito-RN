import groupBy from "object.groupby";
import { Expense, Payment, Transactions } from "../types";

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
export function mapTransactions(transactions: Transactions): (Expense | Payment | string)[] {
  return Object.entries(
    groupBy(transactions, (tx) => tx.date)
  )
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) // Sort by timestamps descending
    .flatMap(([date, txs]) => [date, ...txs]);
}