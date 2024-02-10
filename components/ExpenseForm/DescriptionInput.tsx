import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import useExpenseStore from "@lib/expense-store";

export default function ExpenseDescriptionInput() {
	const [description, setDescription] = useExpenseStore((state) => [
		state.description,
		state.setDescription,
	]);

	return (
		<View style={styles.container}>
			<TextInput
				onChangeText={(text) => setDescription(text)}
				value={description}
				style={styles.input}
				placeholder="Descripción"
				autoCorrect={false}
				autoCapitalize="sentences"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
	},
	input: {
		paddingVertical: 2,
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
		fontSize: 30,
		fontFamily: "Raleway_400Regular",
		textAlign: "center",
	},
});
