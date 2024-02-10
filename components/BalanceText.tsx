import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@lib/helpers/number-formatter";
import Colors from "@constants/Colors";

interface BalanceTextProps {
	balance: number;
	isCurrentUser: boolean;
}

function getSubtitle(balance: number, isCurrentUser: boolean) {
	if (balance > 0) {
		return `${isCurrentUser ? "Recuperás" : "Recupera"} ${formatCurrency(
			balance ?? 0
		)}`;
	}

	return `${isCurrentUser ? "Debés" : "Debe"} ${formatCurrency(
		(balance ?? 0) * -1
	)}`;
}

export default function BalanceText({
	balance,
	isCurrentUser,
}: BalanceTextProps) {
	if (!balance) {
		const text = isCurrentUser
			? "No tenés saldos pendientes"
			: "No tiene saldos pendientes";
		return (
			<View style={styles.container}>
				<Text style={styles.textDefault}>{text}</Text>
			</View>
		);
	}

	const color = balance > 0 ? "Green" : "Red";

	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles[`text${color}`]]}>
				{getSubtitle(balance, isCurrentUser)}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	text: {
		fontSize: 14,
		fontFamily: "Raleway_500Medium",
	},
	textDefault: {
		color: Colors.common.defaultGrey,
	},
	textGreen: {
		color: Colors.common.positiveBalanceColor,
	},
	textRed: {
		color: Colors.common.negativeBalanceColor,
	},
});
