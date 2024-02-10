import React from "react";

/**
 * A React hook that provides a stateful value and a toggle function.
 *
 * @param initialValue The initial value of the state. (`false` by default)
 * @returns An array containing the current state value and the toggle function.
 *
 * The toggle function can be used to toggle the state value between `true` and `false`.
 *
 * Example usage:
 *
 * ```typescript
 * const [isOpen, toggleOpen] = useToggle();
 *
 * <button onClick={toggleOpen}>
 *   {isOpen ? "Close" : "Open"}
 * </button>
 * ```
 */
export default function useToggle(initialValue = false): [boolean, () => void] {
	const [value, setValue] = React.useState(initialValue);

	const toggle = React.useCallback(() => {
		setValue((v) => !v);
	}, []);

	return [value, toggle];
}
