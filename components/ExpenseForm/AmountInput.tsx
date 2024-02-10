import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import MoneyInput from "@inkindcards/react-native-money";
import useExpenseStore from "@lib/expense-store";
import CurrencyInput from "@components/CurrencyInput";
import { useDebounce } from "@uidotdev/usehooks";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import { Member } from "@lib/types";
import {
	handleAmountChange,
	initializeParticipants,
} from "@lib/helpers/expense-form-helpers";
import { numberIsFormatted } from "@lib/helpers/number-formatter";

export default function ExpenseAmountInput({
	participants,
}: {
	participants: Member[];
}) {
	const { data: currentUser } = useCurrentUser();
	const { amount, setAmount, getActiveParticipants, resetParticipants } =
		useExpenseStore((state) => ({
			amount: state.amount,
			setAmount: state.setAmount,
			getActiveParticipants: state.getActiveParticipants,
			resetParticipants: state.resetParticipants,
		}));

	const debouncedAmount = useDebounce(amount, 100);

	useEffect(() => {
		const activePayers = getActiveParticipants("payers");

		if (debouncedAmount === "" && currentUser) {
			resetParticipants();
		}

		if (
			debouncedAmount &&
			numberIsFormatted(debouncedAmount) &&
			currentUser
		) {
			if (!activePayers.length) {
				initializeParticipants({
					amount: debouncedAmount,
					userId: currentUser.id,
					participants,
				});
				return;
			}
			handleAmountChange(debouncedAmount, currentUser.id);
		}
	}, [debouncedAmount]);

	return (
		// <MoneyInput
		// 	keyboardType="number-pad"
		// 	locale="es_AR"
		// 	placeholder="$0,00"
		// 	style={styles.input}
		// 	// @ts-ignore
		// 	value={amount}
		// 	// @ts-ignore
		// 	onChangeText={(value: number, label: string) => {
		// 		setAmount(value);
		// 	}}
		// />
		<CurrencyInput
			value={amount}
			onChangeText={setAmount}
			prefix="$"
			customStyles={{
				container: styles.container,
				prefix: styles.prefix,
				input: styles.input,
			}}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		marginLeft: -12,
		paddingVertical: 12,
	},
	prefix: {
		fontSize: 28,
	},
	input: {
		minWidth: 80,
		fontSize: 28,
		textAlign: "center",
		//
		// paddingVertical: 2,
		// borderBottomColor: "black",
		// borderBottomWidth: StyleSheet.hairlineWidth,
		// fontFamily: "Raleway_400Regular",
	},
});
