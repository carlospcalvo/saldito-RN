import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGroupContext } from "@contexts/GroupContext";
import { Payment, UserID } from "@lib/types";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import { formatCurrency } from "@lib/helpers/number-formatter";
import Colors from "@constants/Colors";

export default function DuePayment({
	payment,
	userId,
}: {
	payment: Payment;
	userId: UserID;
}) {
	const { from_user, to_user, amount } = payment;
	const { data: currentUser } = useCurrentUser();
	const { members } = useGroupContext();

	const payer = members.find((member) => member.user_id === from_user)
		?.profile.name;
	const payee = members.find((member) => member.user_id === to_user)?.profile
		.name;

	return (
		<View style={styles.container}>
			{userId !== currentUser?.id ? (
				<Text style={[styles.text, styles.debtText]}>
					{userId === from_user
						? `Debe ${formatCurrency(amount)} a ${payee}`
						: `${payer} le debe ${formatCurrency(amount)}`}
				</Text>
			) : (
				<Text
					style={[
						styles.text,
						userId === to_user
							? styles.creditText
							: styles.debtText,
					]}
				>
					{`${
						userId === to_user
							? `${payer} te debe ${formatCurrency(amount)}`
							: `Le debes ${formatCurrency(amount)} a ${payee}`
					}`}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
	},
	text: {
		fontSize: 14,
		fontFamily: "Raleway_500Medium",
	},
	debtText: {
		color: Colors.common.negativeBalanceColor,
	},
	creditText: {
		color: Colors.common.positiveBalanceColor,
	},
});
