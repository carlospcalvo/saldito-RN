import React, { memo, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Member } from "@lib/types";
import CollapsableContainer from "../CollapsableContainer";
import BalanceAccordionHeader from "./AccordionHeader";
import BalanceAccordionBody from "./AccordionBody";
import useToggle from "@hooks/useToggle";

interface GroupBalancesItemProps {
	member: Member;
}

function GroupBalancesItem({ member }: GroupBalancesItemProps) {
	const [expanded, toggleExpanded] = useToggle(false);

	return (
		<View style={styles.container}>
			<Pressable onPress={toggleExpanded}>
				<BalanceAccordionHeader member={member} expanded={expanded} />
			</Pressable>
			{member.balance !== 0 && (
				<CollapsableContainer expanded={expanded}>
					<BalanceAccordionBody member={member} />
				</CollapsableContainer>
			)}
		</View>
	);
}

export const styles = StyleSheet.create({
	container: {
		borderBottomColor: "#bbb",
		borderBottomWidth: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 8,
	},
	headerTextContainer: {
		marginLeft: 16,
	},
	title: {},
	subtitle: {},
	icon: {
		marginLeft: "auto",
	},
	avatar: {},
	body: { height: 50 },
});

export default memo(GroupBalancesItem);
