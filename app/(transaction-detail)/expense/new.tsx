import React, { useEffect, useMemo, useState } from "react";
import {
	Alert,
	Modal,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import useGroupMembers from "@hooks/services/groups/useGroupMembers";
import useExpenseStore from "@lib/expense-store";
import DateInput from "@components/ExpenseForm/DateInput";
import ExpenseDescriptionInput from "@components/ExpenseForm/DescriptionInput";
import ExpenseAmountInput from "@components/ExpenseForm/AmountInput";
import ExpenseParticipants from "@components/ExpenseForm/ExpenseParticipants";
import CategoryInput from "@components/ExpenseForm/CategoryInput";
import CurrencyPicker from "@components/ExpenseForm/CurrencyPicker";
import { getParticipants } from "@lib/helpers/string-helpers";
import Divider from "@components/Divider";

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

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<View style={styles.mainContainer}>
					<DateInput />
					<ExpenseDescriptionInput />
					<View style={{ flexDirection: "row", gap: 8 }}>
						<CurrencyPicker />
						<ExpenseAmountInput participants={members ?? []} />
					</View>
					{/* <View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 8,
							gap: 6,
						}}
					>
						<Text style={{ fontFamily: "Raleway_500Medium" }}>
							Pagado por:{" "}
						</Text>
						<Pressable
							style={styles.payersButton}
							onPress={() =>
								router.push(
									`/new-expense-payers?groupId=${groupId}`
								)
							}
						>
							<Text>
								{getParticipants({
									members,
									userId: currentUser?.id,
									type: "payers",
								})}
							</Text>
						</Pressable>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 12,
							gap: 6,
						}}
					>
						<Text style={{ fontFamily: "Raleway_500Medium" }}>
							Dividido entre:
						</Text>
						<Pressable
							style={styles.payersButton}
							onPress={() =>
								router.push(
									`/new-expense-debtors?groupId=${groupId}`
								)
							}
						>
							<Text>
								{getParticipants({
									members,
									userId: currentUser?.id,
									type: "debtors",
								})}
							</Text>
						</Pressable>
					</View> */}
				</View>
				<View style={styles.lowerContainer}>
					<CategoryInput />
					<View style={styles.participantContainer}>
						<ExpenseParticipants
							participants={members ?? []}
							type="payers"
						/>
						<ExpenseParticipants
							participants={members ?? []}
							type="debtors"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		// flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 4,
		paddingVertical: 16,
	},
	lowerContainer: {
		flex: 1,
		backgroundColor: "white",
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
	participantContainer: {
		// paddingTop: 8,
	},
	payersButton: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: "white",
		borderRadius: 8,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});
