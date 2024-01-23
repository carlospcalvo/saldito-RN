import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@lib/number-formatter";

export default function UserTotalBalance({ balance }: { balance: number }) {
	if (balance === 0) {
		return (
			<View style={styles.container}>
				<Text style={[styles.text, styles.textDefault]}>
					No tenés saldos pendientes.
				</Text>
			</View>
		);
	}

	if (balance === undefined || balance === null) {
		return null;
	}

	const formattedBalance = formatCurrency(balance);
	const color = balance > 0 ? "Green" : "Red";

	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles[`text${color}`]]}>
				{`En total, ${
					balance > 0 ? "te deben" : "debés"
				} ${formattedBalance}`}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	text: {
		fontSize: 20,
		fontFamily: "Raleway_600SemiBold",
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
