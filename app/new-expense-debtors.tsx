import { router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
	// const [count, setCount] = useState(0);
	const navigation = useNavigation();

	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					onPress={() => {
						router.back();
					}}
					title="Guardar"
				/>
			),
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Acá van los que participaron</Text>
			{/* <View style={styles.separator} />
			<Text>Count: {count}</Text>
			<Button
				title="Increment"
				onPress={() => setCount((prev) => prev + 1)}
			/> */}
			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontFamily: "Raleway_600SemiBold",
		fontSize: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
