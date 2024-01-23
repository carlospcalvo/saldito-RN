import React, { PropsWithChildren, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { Group, Member } from "@lib/types";
import { User } from "@supabase/supabase-js";
import { FlashList } from "@shopify/flash-list";

interface GroupBalancesProps {
	members: Member[];
	currentUser: User | null | undefined;
}

interface AccordionItemProps {
	member: Member;
}

function AccordionItem({ member }: AccordionItemProps) {
	const [expanded, setExpanded] = useState(false);

	function toggleItem() {
		setExpanded(!expanded);
	}

	return (
		<View style={accordionItemStyles.container}>
			<TouchableOpacity
				style={accordionItemStyles.header}
				onPress={toggleItem}
			>
				<Text style={accordionItemStyles.title}>
					{member.profile.name}
				</Text>
				<Text style={accordionItemStyles.subtitle}>
					{member.balance}
				</Text>
				<Icon
					name={expanded ? "chevron-up" : "chevron-down"}
					size={20}
					color="#bbb"
				/>
			</TouchableOpacity>
			{expanded && (
				<View style={accordionItemStyles.body}>
					<Text>{member.balance}</Text>
				</View>
			)}
		</View>
	);
}

const accordionItemStyles = StyleSheet.create({
	container: {},
	header: {},
	title: {},
	subtitle: {},
	avatar: {},
	body: {},
});

export default function GroupBalances({
	members,
	currentUser,
}: GroupBalancesProps) {
	return (
		<View style={styles.container}>
			<FlashList
				data={members}
				renderItem={({ item }) => (
					<AccordionItem
						member={item as Member}
						key={(item as Member).user_id}
					/>
				)}
				estimatedItemSize={120}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 200,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	tabTitle: {
		fontFamily: "Raleway_500Medium",
		fontSize: 20,
		paddingVertical: 4,
	},
	title: {
		fontFamily: "Raleway_400Regular",
		fontSize: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
