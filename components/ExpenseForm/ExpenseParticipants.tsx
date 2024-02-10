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
	const getActiveParticipants = useExpenseStore(
		(state) => state.getActiveParticipants
	);
	const hasActiveParticipants = getActiveParticipants(type).length > 0;

	return (
		<>
			<Header
				expanded={expanded}
				onPress={toggleExpanded}
				participants={participants}
				type={type}
			/>
			<CollapsableContainer expanded={expanded && hasActiveParticipants}>
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
