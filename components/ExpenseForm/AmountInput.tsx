import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useExpenseStore from "@lib/expense-store";
import CurrencyInput from "@components/CurrencyInput";
import { useDebounce } from "@uidotdev/usehooks";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import { Member } from "@lib/types";
import {
	handleAmountChange,
	initializeParticipants,
} from "@lib/helpers/expense-form-helpers";

export default function ExpenseAmountInput({
	participants,
}: {
	participants: Member[];
}) {
	const { data: currentUser } = useCurrentUser();
	const {
		amount,
		currency,
		setAmount,
		getActiveParticipants,
		resetParticipants,
	} = useExpenseStore((state) => ({
		amount: state.amount,
		currency: state.currency,
		setAmount: state.setAmount,
		getActiveParticipants: state.getActiveParticipants,
		resetParticipants: state.resetParticipants,
	}));

	const debouncedAmount = useDebounce(amount, 100);

	useEffect(() => {
		const activePayers = getActiveParticipants("payers");

		if (debouncedAmount === 0 && currentUser) {
			resetParticipants();
		}

		if (debouncedAmount && currentUser) {
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
		<View style={styles.container}>
			<CurrencyInput
				currency={currency}
				value={amount}
				onChangeText={setAmount}
				style={styles.input}
				key={`${currency}-amount`}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 4,
		paddingBottom: 8,
	},
	prefix: {
		fontSize: 28,
	},
	input: {
		minWidth: 80,
		fontSize: 28,
		// textAlign: "center",
	},
});
