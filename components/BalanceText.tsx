import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@lib/number-formatter"; // Assuming this is available

interface BalanceTextProps {
	balance: number;
	isCurrentUser: boolean;
}

export default function BalanceText({
	balance,
	isCurrentUser,
}: BalanceTextProps) {
	if (!balance) {
		return (
			<View style={styles.container}>
				<Text style={styles.textDefault}>Cuenta saldada</Text>
			</View>
		);
	}

	const formattedBalance = formatCurrency(balance);
	const verb = isCurrentUser ? "Recuperás" : "Recupera";
	const color = balance > 0 ? "Green" : "Red";

	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles[`text${color}`]]}>
				{`${verb} ${formattedBalance}`}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// Adjust layout as needed
	},
	text: {
		fontSize: 14, // Adjust font size
		fontFamily: "Raleway_500Medium",
	},
	textDefault: {
		color: "gray",
	},
	textGreen: {
		color: "green",
	},
	textRed: {
		color: "red",
	},
});
