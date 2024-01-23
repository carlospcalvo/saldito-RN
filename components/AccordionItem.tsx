import React, { memo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { Member } from "@lib/types";
import { Avatar } from "@ui-kitten/components";

interface AccordionItemProps {
	member: Member;
}

function AccordionItem({ member }: AccordionItemProps) {
	const [expanded, setExpanded] = useState(false);
	function toggleItem() {
		setExpanded(!expanded);
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.header} onPress={toggleItem}>
				<View>
					<Avatar
						source={{ uri: member?.profile?.avatar }}
						style={[styles.avatar, { height: 56, width: 56 }]}
					/>
				</View>
				<View style={styles.headerTextContainer}>
					<Text style={styles.title}>{member?.profile?.name}</Text>
					<Text style={styles.subtitle}>{member?.balance}</Text>
				</View>
				<Icon
					name={expanded ? "chevron-up" : "chevron-down"}
					size={20}
					style={styles.icon}
					color="#bbb"
				/>
			</TouchableOpacity>
			{expanded && (
				<View style={styles.body}>
					<Text>{member.balance}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
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
	body: {},
});

export default memo(AccordionItem);
