import React from "react";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Member } from "@lib/types";
import CollapsableContainer from "@components/CollapsableContainer";
import useToggle from "@hooks/useToggle";
import Dimensions from "@constants/Dimensions";
import Participant from "./Participant";
import Header from "./Header";
import Footer from "./Footer";
import { handleParticipantSelection } from "@lib/helpers/expense-form-helpers";
import useExpenseStore from "@lib/expense-store";

interface ExpenseParticipantsProps {
	participants: Member[];
	type: "payers" | "debtors";
}

export default function ExpenseParticipants({
	participants,
	type,
}: ExpenseParticipantsProps) {
	const [expanded, toggleExpanded] = useToggle(false);
	const amount = useExpenseStore((state) => state.amount);

	return (
		<>
			<Header
				expanded={expanded}
				onPress={toggleExpanded}
				participants={participants}
				type={type}
			/>
			<CollapsableContainer expanded={expanded && Boolean(amount)}>
				<View style={styles.listContainer}>
					<FlashList
						data={participants}
						renderItem={({ item }) => (
							<Participant
								item={item}
								onSelected={handleParticipantSelection}
								type={type}
							/>
						)}
						estimatedItemSize={50}
						ListFooterComponent={Footer}
					/>
				</View>
			</CollapsableContainer>
		</>
	);
}

export const styles = StyleSheet.create({
	listContainer: {
		minHeight: 50,
		width: Dimensions.screen.width,
		paddingHorizontal: 16,
		paddingBottom: 8,
	},
});
