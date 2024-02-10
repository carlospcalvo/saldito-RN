import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { Member } from "@lib/types";
import { Avatar } from "@ui-kitten/components";
import useToggle from "@hooks/useToggle";
import CurrencyInput from "@components/CurrencyInput";
import useExpenseStore from "@lib/expense-store";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import Dimensions from "@constants/Dimensions";
import { updateParticipant } from "@lib/helpers/expense-form-helpers";

interface ParticipantProps {
	item: Member;
	onSelected: (
		isSelected: boolean,
		id: string,
		participantType: "payer" | "debtor"
	) => void;
	type: "payers" | "debtors";
}

export default function Participant({
	item,
	onSelected,
	type,
}: ParticipantProps) {
	const participantType = type.slice(0, -1) as "payer" | "debtor";
	const { data: currentUser } = useCurrentUser();
	const isCurrentUser = item.user_id === currentUser?.id;
	const { amount, participants, getActiveParticipants } = useExpenseStore(
		(state) => ({
			amount: state.amount,
			participants: {
				payers: state.payers,
				debtors: state.debtors,
			},
			getActiveParticipants: state.getActiveParticipants,
		})
	);
	const activeParticipants = getActiveParticipants(type);
	const [isChecked, toggleChecked] = useToggle(isCurrentUser);

	function handleChecked() {
		onSelected(!isChecked, item.user_id, participantType);
		toggleChecked();
	}

	function handleUserShareChange(value: number, id: string) {
		const share = value ?? 0;
		return updateParticipant(id, share, type);
	}

	useEffect(() => {
		if (activeParticipants.includes(item.user_id) !== isChecked) {
			toggleChecked();
		}
	}, [activeParticipants]);

	return (
		<View style={[styles.itemContainer]}>
			<View style={styles.avatarContainer}>
				<Checkbox
					value={isChecked}
					onValueChange={handleChecked}
					style={{ borderRadius: 4 }}
				/>
				<Avatar
					source={{
						uri: item.profile.avatar,
					}}
					size="small"
				/>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text style={styles.name}>{item.profile.name}</Text>
					{/* // TODO: Replace with new money input */}
					<CurrencyInput
						disabled={!activeParticipants.includes(item.user_id)}
						value={participants[type].get(item.user_id)}
						onChangeText={(value: number) => {
							handleUserShareChange(value, item.user_id);
						}}
						style={styles.contribution}
					/>
				</View>
			</View>
		</View>
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
		minWidth: 50,
		textAlign: "center",
	},
});
