import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Chip from "@components/Chip";
import Dimensions from "@constants/Dimensions";
import useExpenseCategories from "@hooks/services/expenses/useExpenseCategories";
import useExpenseStore from "@lib/expense-store";

export default function CategoryInput() {
	const { selected, setSelected } = useExpenseStore((state) => ({
		selected: state.category,
		setSelected: state.setCategory,
	}));
	const { data: categories } = useExpenseCategories();

	return (
		<View style={styles.container}>
			<FlatList
				data={categories}
				renderItem={({ item }) => (
					<Chip
						text={item.name}
						icon={item.icon}
						selected={selected === item.id}
						onPress={() => setSelected(item.id)}
						style={{
							container: {
								marginHorizontal: 2,
								// backgroundColor: "#dcdee0",
								backgroundColor: "transparent",
								borderColor: "grey",
								borderWidth: StyleSheet.hairlineWidth,
								flexDirection: "row",
								alignItems: "center",
								gap: 6,

								// shadowColor: "#000",
								// shadowOffset: {
								// 	width: 0,
								// 	height: 1,
								// },
								// shadowOpacity: 0.2,
								// shadowRadius: 1.41,
								// elevation: 2,
							},
							selectedContainer: {
								backgroundColor: "#338EF7",
							},
							icon: {
								color: "#338EF7",
							},
							selectedIcon: {
								color: "white",
							},
							selectedText: {
								color: "white",
								fontFamily: "Raleway_600SemiBold",
							},
						}}
					/>
				)}
				horizontal
				scrollEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					gap: 4,
					paddingHorizontal: 8,
					paddingVertical: 8,
				}}
				style={{ width: Dimensions.screen.width, height: "100%" }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 12,
		borderColor: "grey",
		borderBottomWidth: StyleSheet.hairlineWidth,
		// borderTopWidth: StyleSheet.hairlineWidth,
	},
});
