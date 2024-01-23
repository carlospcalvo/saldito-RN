import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import useGroupBalances from "@hooks/services/groups/useGroupBalances";
import { Member } from "@lib/types";
import AccordionItem from "@components/AccordionItem";

export default function Balances() {
	const { id } = useGlobalSearchParams();
	const currentUser = useCurrentUser();
	const { data: members } = useGroupBalances(id as string);

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
		minHeight: 2,
		height: Dimensions.get("screen").height,
		width: Dimensions.get("screen").width,
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
