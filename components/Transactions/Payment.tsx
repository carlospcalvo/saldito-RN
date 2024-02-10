import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { useGroupContext } from "@contexts/GroupContext";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import { formatCurrencyRounded } from "@lib/helpers/number-formatter";
import { Payment as PaymentType } from "@lib/types";
import Colors from "@constants/Colors";
import { router } from "expo-router";

export default function Payment({ item }: { item: PaymentType }) {
	const { members, currentGroup } = useGroupContext();
	const { data: currentUser } = useCurrentUser();

	function formatMessageString({ from_user, to_user, amount }: PaymentType) {
		const payeeName = members.find((user) => user.user_id === to_user)
			?.profile.name;
		const payerName = members.find((user) => user.user_id === from_user)
			?.profile.name;
		const formattedAmount = formatCurrencyRounded(amount);

		if (from_user === currentUser?.id) {
			return `Pagaste ${formattedAmount} a ${payeeName}`;
		}

		if (to_user === currentUser?.id) {
			return `${payerName} te pagó ${formattedAmount}`;
		}

		return `${payerName} pagó a ${payeeName} ${formattedAmount}`;
	}

	return (
		<Pressable
			style={styles.container}
			onPress={() =>
				router.push(`/payment/${item.id}?groupId=${currentGroup?.id}`)
			}
		>
			<Icon name="money-bill-transfer" size={24} style={styles.icon} />
			<Text style={styles.text}>{formatMessageString(item)}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: Colors.common.paymentBackground,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	icon: {
		color: "green",
		backgroundColor: Colors.common.paymentBackground,
	},
	text: {
		fontFamily: "Raleway_400Regular",
	},
});
