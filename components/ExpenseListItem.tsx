import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatCurrencyRounded } from "@lib/number-formatter";
import { useGroupContext } from "@contexts/GroupContext";
// import ExpenseBalanceChip from "./ExpenseBalanceChip";
// import ReceiptIcon from "@/lib/icons/ReceiptIcon"; // Assuming ReceiptIcon is a React Native component
import Icon from "@expo/vector-icons/FontAwesome6";
import { Expense, ExpenseParticipant, Member, UserID } from "@lib/types";
import { partition } from "@lib/helpers/array-helpers";
import { formatExpenseLabel } from "@lib/helpers/string-helpers";

interface ExpenseListItemProps {
	expense: Expense;
	members: Member[];
}

function calculateExpenseBalance({
	hasParticipated,
	payers,
	debtors,
	userId,
}: {
	hasParticipated: boolean;
	payers: ExpenseParticipant[];
	debtors: ExpenseParticipant[];
	userId: UserID;
}): { expenseBalance: number; userCredit: number } {
	let expenseBalance = 0;
	let userCreditAmount = 0;
	let userDebtAmount = 0;

	if (hasParticipated) {
		userCreditAmount =
			payers.find((participant) => participant.user_id === userId)
				?.amount ?? 0;
		userDebtAmount =
			debtors.find((participant) => participant.user_id === userId)
				?.amount ?? 0;

		expenseBalance = userCreditAmount - userDebtAmount;
	}

	return { expenseBalance, userCredit: userCreditAmount };
}

export default function ExpenseListItem({
	expense,
	members,
}: ExpenseListItemProps) {
	const { id, amount, description, expense_participants } = expense;
	const { currentUser } = useGroupContext();
	const [payers, debtors] = partition(
		expense_participants,
		(participant) => participant.participated_as === "creditor"
	);

	const hasParticipated = expense_participants.some(
		(user) => user.user_id === currentUser?.id
	);

	const { expenseBalance, userCredit } = calculateExpenseBalance({
		hasParticipated,
		payers,
		debtors,
		userId: currentUser!.id,
	});

	return (
		<TouchableOpacity style={styles.container} key={id}>
			<View style={styles.iconContainer}>
				<Icon
					name="receipt"
					size={26}
					style={{ color: "white", margin: 0, padding: 0 }}
				/>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.descriptionText}>{description}</Text>
				<Text style={styles.labelText}>
					{formatExpenseLabel({
						payers,
						members,
						amount,
						userId: currentUser!.id,
						userCredit,
					})}
				</Text>
			</View>
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>
					{formatCurrencyRounded(amount)}
				</Text>
				<Text style={styles.balanceText}>
					{formatCurrencyRounded(expenseBalance)}
				</Text>
				{/* <ExpenseBalanceChip expenseBalance={expenseBalance} /> */}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 12,
		borderWidth: 1,
		borderColor: "lightgray",
	},
	iconContainer: {
		height: 48,
		width: 48,
		borderRadius: 4,
		backgroundColor: "#0553",
		alignItems: "center",
		justifyContent: "center",
	},
	contentContainer: {
		paddingLeft: 8,
		justifyContent: "center",
	},
	descriptionText: {
		fontSize: 18,
		fontFamily: "Raleway_600SemiBold",
	},
	labelText: {
		fontSize: 12,
		fontFamily: "Raleway_400Regular",
	},
	amountContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-end",
		marginLeft: "auto",
	},
	amountText: {
		fontFamily: "Raleway_600SemiBold",
	},
	balanceText: {
		fontFamily: "Raleway_400Regular",
	},
});
