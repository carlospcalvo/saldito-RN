import {
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/FontAwesome6";

interface ChipProps {
	text: React.ReactNode;
	icon?: string;
	selected?: boolean;
	onPress?: VoidFunction;
	style?: {
		container?: StyleProp<ViewStyle>;
		selectedContainer?: StyleProp<ViewStyle>;
		text?: StyleProp<TextStyle>;
		selectedText?: StyleProp<TextStyle>;
		icon?: StyleProp<TextStyle>;
		selectedIcon?: StyleProp<TextStyle>;
	};
}

export default function Chip({
	text,
	icon,
	onPress,
	selected,
	style,
}: ChipProps) {
	const Container = onPress ? Pressable : View;

	return (
		<Container
			onPress={onPress}
			style={[
				styles.container,
				style?.container,
				selected && style?.selectedContainer,
			]}
		>
			{icon && (
				<Icon
					name={icon}
					style={[style?.icon, selected && style?.selectedIcon]}
				/>
			)}
			<Text
				style={[
					styles.text,
					style?.text,
					selected && style?.selectedText,
				]}
			>
				{text}
			</Text>
		</Container>
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
