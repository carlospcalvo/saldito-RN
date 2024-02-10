import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useGroupContext } from "@contexts/GroupContext";
import GroupBalancesItem from "@components/Balances/GroupBalancesItem";
import { Member } from "@lib/types";
import Dimensions from "@constants/Dimensions";
import useUserGroups from "@hooks/services/groups/useUserGroups";

export default function BalancesScreen() {
	const { members } = useGroupContext();
	const { refetch: refetchGroups, isRefetching } = useUserGroups();

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.listSafeArea}>
				<FlashList
					contentContainerStyle={styles.listContainer}
					data={members}
					renderItem={({ item }) => (
						<GroupBalancesItem
							member={item as Member}
							key={(item as Member).user_id}
						/>
					)}
					estimatedItemSize={20}
					onRefresh={refetchGroups}
					refreshing={isRefetching}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listSafeArea: {
		minHeight: 2,
		height: Dimensions.screen.height - Dimensions.groupDetailHeader.height,
		width: Dimensions.screen.width,
	},
	listContainer: {
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
