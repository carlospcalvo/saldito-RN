import React from "react";
import { StyleSheet, View, SafeAreaView, Pressable, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Icon from "@expo/vector-icons/FontAwesome6";
import { useGroupContext } from "@contexts/GroupContext";
import ExpenseListItem from "@components/Transactions/ExpenseListItem";
import Dimensions from "@constants/Dimensions";
import useUserGroups from "@hooks/services/groups/useUserGroups";
import { isTransaction } from "@lib/types";
import { router } from "expo-router";

// TODO: refactor to use infinite query
export default function Expenses() {
	const { currentGroup, orderedTxs } = useGroupContext();
	const { refetch: refetchGroups, isRefetching } = useUserGroups();

	const stickyHeaderIndices = orderedTxs
		?.map((item, index) => {
			if (typeof item === "string") {
				return index;
			} else {
				return null;
			}
		})
		.filter((item) => item !== null) as number[];

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.listSafeArea}>
				{!!orderedTxs?.length && (
					<FlashList
						data={orderedTxs}
						renderItem={ExpenseListItem}
						getItemType={(item) =>
							isTransaction(item) ? "row" : "sectionHeader"
						}
						stickyHeaderIndices={stickyHeaderIndices}
						estimatedItemSize={100}
						onRefresh={refetchGroups}
						refreshing={isRefetching}
					/>
				)}
				<Pressable
					style={styles.fab}
					onPress={() =>
						router.push(
							`/(transaction-detail)/expense/new?groupId=${currentGroup?.id}`
						)
					}
				>
					<Icon name="plus" color="white" size={24} />
				</Pressable>
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
	fab: {
		width: 64,
		height: 64,
		borderRadius: 90,
		backgroundColor: "green",
		position: "absolute",
		bottom: 32,
		right: 28,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
