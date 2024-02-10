import React from "react";
import {
	GestureResponderEvent,
	Pressable,
	StyleSheet,
	Text,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";

interface BackButtonProps {
	title?: string;
	onPress: ((event: GestureResponderEvent) => void) | null | undefined;
	iconSize?: number;
	iconColor?: string;
}

export default function BackButton({
	title = "",
	onPress,
	iconSize,
	iconColor,
}: BackButtonProps) {
	return (
		<Pressable onPress={onPress} style={styles.container}>
			<Icon
				name="arrow-left"
				color={iconColor ?? "black"}
				size={iconSize ?? 20}
			/>
			{title && <Text style={styles.text}>{title}</Text>}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		padding: 4,

		// borderColor: "red",
		// borderWidth: 1,
	},
	icon: {},
	text: {
		fontSize: 14,
		fontFamily: "Raleway_400Regular",
	},
});
