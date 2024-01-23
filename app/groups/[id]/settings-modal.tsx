import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function SettingsModalScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Acá va la configuración del grupo</Text>
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
