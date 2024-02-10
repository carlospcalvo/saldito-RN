import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import useGroupMembers from "@hooks/services/groups/useGroupMembers";
import useExpenseStore from "@lib/expense-store";
import { moveToFront } from "@lib/helpers/array-helpers";
import DateInput from "@components/ExpenseForm/DateInput";
import ExpenseDescriptionInput from "@components/ExpenseForm/DescriptionInput";
import ExpenseAmountInput from "@components/ExpenseForm/AmountInput";
import ExpenseParticipants from "@components/ExpenseForm/ExpenseParticipants";
import MoneyInput from "@inkindcards/react-native-money";

export default function NewExpenseScreen() {
	const { groupId } = useLocalSearchParams<{
		groupId: string;
	}>();
	const { data: members } = useGroupMembers(groupId);
	const { data: currentUser } = useCurrentUser();

	const state = useExpenseStore((state) => state);

	useEffect(() => {
		state.setCreatedBy(currentUser?.id);
		state.setGroupId(groupId);
	}, []);

	// console.log(state);

	const sortedMembers = useMemo(
		() => moveToFront(members ?? [], currentUser?.id ?? "", "user_id"),
		[members, currentUser]
	);

	const Divider = () => (
		<View
			style={{
				borderBottomColor: "grey",
				borderBottomWidth: StyleSheet.hairlineWidth,
			}}
		/>
	);

	const [bill, setBill] = useState<number | undefined>();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<View style={styles.mainContainer}>
					<DateInput />
					<ExpenseDescriptionInput />
					<ExpenseAmountInput participants={sortedMembers} />
					{/* <MoneyInput
						// @ts-ignore
						value={bill}
						keyboardType="number-pad"
						locale="es_AR"
						placeholder="$0,00"
						// @ts-ignore
						onChangeText={(value: number, label: string) => {
							setBill(value);
						}}
					/> */}
				</View>
				<Divider />
				<View /* style={styles.participantContainer} */>
					<ExpenseParticipants
						participants={sortedMembers}
						type="payers"
					/>
					<Divider />
					<ExpenseParticipants
						participants={sortedMembers}
						type="debtors"
					/>
					<Divider />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 4,
		paddingVertical: 8,
	},
	expenseDate: {
		borderRadius: 8,
		// borderColor: "black",
		// borderWidth: 1,
		backgroundColor: "#dcdee0",
		// fontFamily: "Raleway_400Regular",
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	description: {
		fontSize: 30,
		fontFamily: "Raleway_500Medium",
	},
	amount: {
		fontSize: 28,
		fontFamily: "Raleway_500Medium",
	},
	creationDate: {
		fontSize: 12,
		paddingVertical: 4,
		fontFamily: "Raleway_400Regular",
	},
});
