import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	Expense as ExpenseType,
	Payment as PaymentType,
	isExpense,
	isTransaction,
} from "@lib/types";
import Expense from "./Expense";
import { add, intlFormat } from "date-fns";
import Payment from "./Payment";

export default function ExpenseListItem({
	item,
}: {
	item: string | ExpenseType | PaymentType;
}) {
	if (isTransaction(item)) {
		// Render item
		if (isExpense(item)) {
			return <Expense expense={item} />;
		}

		return <Payment item={item} />;
	}

	// Rendering header
	return (
		<View style={styles.listSectionHeader}>
			<View style={styles.chip}>
				<Text style={styles.listSectionHeaderText}>
					{intlFormat(
						add(item, { hours: 3 }),
						{
							year: "numeric",
							month: "long",
							day: "numeric",
						},
						{
							locale: "es-AR",
						}
					)}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	listSectionHeader: {
		width: "100%",
		alignItems: "center",
		paddingVertical: 8,
	},
	listSectionHeaderText: {
		fontFamily: "Raleway_600SemiBold",
		color: "white",
	},
	chip: {
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "grey",
		backgroundColor: "grey",
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
});
