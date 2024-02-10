import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import useExpenseStore from "@lib/expense-store";
import {
	formatCurrency,
	removeFormatting,
} from "@lib/helpers/number-formatter";
import Dimensions from "@constants/Dimensions";
import Colors from "@constants/Colors";

export default function Footer() {
	const { amount, payers } = useExpenseStore((state) => ({
		amount: state.amount,
		payers: state.payers,
	}));

	const getPayersTotal = () =>
		Array.from(payers.values()).reduce((sum, amount) => {
			return sum + (amount ? removeFormatting(amount) : 0);
		}, 0);

	const payersTotal = getPayersTotal();

	return (
		<View style={{ paddingVertical: 8 }}>
			<Text
				style={{
					textAlign: "right",
					fontFamily:
						payersTotal !== removeFormatting(amount!)
							? "Raleway_500Medium"
							: "Raleway_400Regular",
					color:
						payersTotal !== removeFormatting(amount!)
							? "red"
							: "black",
				}}
			>
				{`${formatCurrency(payersTotal)} de ${formatCurrency(
					amount ? removeFormatting(amount) : 0
				)}`}
			</Text>
		</View>
	);
}

export const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 8,
		// backgroundColor: "blue",
	},
	textContainer: {
		marginLeft: 16,
		gap: 4,
	},
	title: {
		fontSize: 18,
		fontFamily: "Raleway_600SemiBold",
		// padding: 12,
	},
	subtitle: {
		fontSize: 14,
		fontFamily: "Raleway_500Medium",
	},
	icon: {
		marginLeft: "auto",
	},
	listContainer: {
		minHeight: 50,
		width: Dimensions.screen.width,
		padding: 16,
		// backgroundColor: "red",
	},
	itemContainer: {
		paddingHorizontal: 4,
		paddingVertical: 8,
		borderBottomColor: "grey",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	avatarContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	name: {
		fontSize: 16,
		fontFamily: "Raleway_500Medium",
	},
	contribution: {
		fontSize: 16,
		fontFamily: "Raleway_400Regular",
		marginLeft: "auto",
	},
});
