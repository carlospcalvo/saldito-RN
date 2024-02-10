import { StyleSheet, View } from "react-native";
import React from "react";
import { useGroupContext } from "@contexts/GroupContext";
import { Member, Payment } from "@lib/types";
import DuePayment from "./DuePayment";
import Dimensions from "@constants/Dimensions";

export default function BalanceAccordionBody({ member }: { member: Member }) {
	const { getMemberDuePayments } = useGroupContext();
	const duePayments = getMemberDuePayments(member?.user_id);

	return (
		<View style={styles.container}>
			{duePayments.map((payment) => (
				<DuePayment
					payment={payment as Payment}
					userId={member.user_id}
					key={`${member.user_id}-${payment.from_user}-${payment.to_user}`}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: 3,
		// height: Dimensions.screen.height,
		// width: Dimensions.screen.width,
	},
});
