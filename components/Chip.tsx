import {
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import React from "react";

interface ChipProps {
	text: React.ReactNode;
	style?: {
		container: StyleProp<ViewStyle>;
		text: StyleProp<TextStyle>;
	};
}

export default function Chip({ text, style }: ChipProps) {
	return (
		<View
			style={
				style?.container
					? [styles.container, style.container]
					: styles.container
			}
		>
			<Text style={style?.text ? [styles.text, style.text] : styles.text}>
				{text}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderColor: "grey",
	},
	text: {
		fontFamily: "Raleway_400Regular",
	},
});
