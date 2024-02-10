import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { Member } from "@lib/types";
import { Avatar } from "@ui-kitten/components";
import BalanceText from "../BalanceText";
import useCurrentUser from "@hooks/auth/useCurrentUser";

export default function BalanceAccordionHeader({
	member,
	expanded,
}: {
	member: Member;
	expanded: boolean;
}) {
	const { data: user } = useCurrentUser();

	return (
		<View style={styles.container}>
			<View>
				<Avatar
					source={{ uri: member?.profile?.avatar }}
					style={[styles.avatar, { height: 56, width: 56 }]}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{member?.profile?.name}</Text>
				<BalanceText
					balance={member.balance}
					isCurrentUser={member.user_id === user?.id}
				/>
			</View>
			{member.balance !== 0 && (
				<Icon
					name={expanded ? "chevron-up" : "chevron-down"}
					size={20}
					style={styles.icon}
					color="#bbb"
				/>
			)}
		</View>
	);
}

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 8,
	},
	textContainer: {
		marginLeft: 16,
		gap: 4,
	},
	title: {
		fontSize: 16,
		fontFamily: "Raleway_600SemiBold",
	},
	icon: {
		marginLeft: "auto",
	},
	avatar: {},
	body: { height: 50 },
});
