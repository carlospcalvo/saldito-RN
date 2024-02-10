import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { useShallow } from "zustand/react/shallow";
import useExpenseStore from "@lib/expense-store";
import Dimensions from "@constants/Dimensions";
import { Member, UserID } from "@lib/types";
import useCurrentUser from "@hooks/auth/useCurrentUser";

interface HeaderProps {
	expanded: boolean;
	onPress: () => void;
	participants: Member[];
	type: "payers" | "debtors";
}

export default function Header({
	expanded,
	onPress,
	participants,
	type,
}: HeaderProps) {
	const { data: currentUser } = useCurrentUser();
	const { amount, payers, debtors, getActiveParticipants } = useExpenseStore(
		(state) => ({
			amount: state.amount,
			payers: state.payers,
			debtors: state.debtors,
			getActiveParticipants: state.getActiveParticipants,
		})
	);

	const getSubtitle = () => {
		let ids: UserID[] = getActiveParticipants(type);

		if (ids.length === 0) {
			if (!!amount) {
				return type === "payers" ? "Paga dios?" : "No participó nadie?";
			} else {
				return "Todos";
			}
		}

		if (ids.length === participants.length) {
			return "Todos";
		}

		if (ids.includes(currentUser?.id!)) {
			switch (ids.length) {
				case 1:
					return "Vos";
				case 2:
					return `Vos y 1 miembro más`;
				default:
					return `Vos y ${ids.length - 1} miembros más`;
			}
		}

		if (ids.length === 1) {
			return participants.find(
				(participant) => participant.user_id === ids[0]
			)?.profile.name;
		}

		if (ids.length > 1) {
			return `${ids.length} miembros`;
		}
	};

	const subtitle = getSubtitle();

	return (
		<Pressable
			onPress={onPress}
			disabled={!amount}
			style={
				!amount && {
					opacity: 0.3,
				}
			}
		>
			<View style={styles.headerContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>
						{type === "payers" ? "Pagado por:" : "Se divide entre:"}
					</Text>
					<Text style={styles.subtitle}>{subtitle}</Text>
				</View>
				<Icon
					name={expanded ? "chevron-up" : "chevron-down"}
					size={20}
					style={styles.icon}
					color="#bbb"
				/>
			</View>
		</Pressable>
	);
}

export const styles = StyleSheet.create({
	headerContainer: {
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
		fontSize: 18,
		fontFamily: "Raleway_600SemiBold",
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
