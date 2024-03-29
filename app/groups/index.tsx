import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import UserTotalBalance from "@components/UserTotalBalance";
import GroupCard from "@components/Groups/GroupCard";
import { Group } from "@lib/types";
import { Layout, Spinner } from "@ui-kitten/components";
import useUserGroups from "@hooks/services/groups/useUserGroups";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

function GroupsScreen() {
	const {
		data: groups,
		isLoading,
		refetch: refetchGroups,
		isRefetching,
	} = useUserGroups();
	const screenIsFocused = useIsFocused();

	if (isLoading) {
		return (
			<Layout style={styles.loadingContainer} level="1">
				<Spinner size="giant" />
			</Layout>
		);
	}

	const userTotalBalance =
		groups?.reduce(
			(accumulator, item) => accumulator + item.userBalance,
			0
		) ?? 0;

	return (
		<View style={styles.container}>
			{/* <Text style={styles.title}>Grupos</Text> */}
			{groups!.length > 0 && (
				<View style={styles.titleContainer}>
					<UserTotalBalance balance={userTotalBalance} />
				</View>
			)}
			<View style={styles.listContainer}>
				<FlashList
					data={groups}
					renderItem={({ item }) => (
						<GroupCard
							group={item as Group}
							onPress={() => {
								router.push(`/groups/${item.id}`);
							}}
							key={(item as Group).id}
						/>
					)}
					estimatedItemSize={120}
					onRefresh={refetchGroups}
					refreshing={isRefetching && screenIsFocused}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyTitle}>
								Aún no tenés grupos.
							</Text>
							<Text style={styles.emptySubtitle}>
								Creá tu primer grupo y empezá a registrar tus
								gastos
							</Text>
						</View>
					}
				/>
			</View>
			<StatusBar style="dark" />
		</View>
	);
}

export default memo(GroupsScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	titleContainer: {
		width: "100%",
	},
	title: {
		fontFamily: "Raleway_600SemiBold",
		fontSize: 20,
	},
	separator: {
		marginVertical: 10,
		height: 1,
		width: "80%",
	},
	listContainer: {
		width: "100%",
		height: "100%",
		paddingHorizontal: 16,
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
		paddingBottom: 32,
	},
	emptyTitle: {
		fontFamily: "Raleway_500Medium",
		fontSize: 20,
		color: "grey",
		textAlign: "center",
	},
	emptySubtitle: {
		fontFamily: "Raleway_400Regular",
		fontSize: 16,
		color: "grey",
		textAlign: "center",
	},
});
