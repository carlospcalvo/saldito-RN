import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useGroupContext } from "@contexts/GroupContext";
import { formatCurrency } from "@lib/number-formatter";
import { add, intlFormat } from "date-fns";
import { isExpense, isTransaction } from "@lib/types";
import { mapTransactions } from "@lib/helpers/array-helpers";
import ExpenseListItem from "@components/ExpenseListItem";

export default function Expenses() {
	const { id } = useGlobalSearchParams();
	const { groups } = useGroupContext();
	const currentGroup = groups?.find((group) => group.id === id);
	const transactions = currentGroup
		? [...currentGroup?.expenses, ...currentGroup?.payments]
		: [];

	const orderedTxs = mapTransactions(transactions);

	return (
		<View style={styles.container}>
			{!!currentGroup?.expenses?.length && (
				<FlashList
					data={orderedTxs}
					renderItem={({ item }) => {
						if (isTransaction(item)) {
							// Render item
							if (isExpense(item)) {
								return (
									<ExpenseListItem
										expense={item}
										members={currentGroup.members}
									/>
								);
							}

							return (
								<Text>{`${"Pago"} - ${formatCurrency(
									item.amount
								)}`}</Text>
							);
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
					}}
					getItemType={(item) => {
						// To achieve better performance, specify the type based on the item
						return isTransaction(item) ? "row" : "sectionHeader";
					}}
					stickyHeaderIndices={
						orderedTxs
							?.map((item, index) => {
								if (typeof item === "string") {
									return index;
								} else {
									return null;
								}
							})
							.filter((item) => item !== null) as number[]
					}
					estimatedItemSize={100}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: 2,
		height: Dimensions.get("screen").height,
		width: Dimensions.get("screen").width,
	},
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
		borderWidth: 1,
		borderRadius: 12,
		borderColor: "grey",
		backgroundColor: "grey",
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
});
