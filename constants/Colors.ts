const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const negativeBalanceColor = "#f87171"; // red
const positiveBalanceColor = "#65a30d"; // green
const defaultGrey = "#A1A1AA"; // grey

const paymentBackground = "#E8FAF0"; // green-50

export default {
	common: {
		negativeBalanceColor,
		positiveBalanceColor,
		defaultGrey,
		paymentBackground,
	},
	light: {
		text: "#000",
		background: "#fff",
		tint: tintColorLight,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#fff",
		background: "#000",
		tint: tintColorDark,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorDark,
	},
};
