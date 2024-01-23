export function round(num: number) {
	return +(Math.round(+(num + "e+2")) + "e-2");
}
