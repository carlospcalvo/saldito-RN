import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { GroupCategory } from "@lib/types";

interface CornerButtonProps {
	category: GroupCategory;
}

const getStyles = (category: GroupCategory) =>
	StyleSheet.create({
		container: {
			position: "absolute",
			top: 12,
			right: 7,
			width: 80,
			height: 60,
			padding: 2,
			backgroundColor: categoryToColor(category),
			transform: [
				{ translateX: 40 },
				{ translateY: -35 },
				{ rotate: "45deg" },
			],
		},
		icon: {
			alignSelf: "center",
			transform: [{ translateY: 35 }, { rotate: "-45deg" }],
		},
	});

export default function CornerRibbon({ category }: CornerButtonProps) {
	const iconMap = {
		[GroupCategory.FAMILY]: "people-roof",
		[GroupCategory.WORK]: "briefcase",
		[GroupCategory.FRIENDS]: "people-group",
		[GroupCategory.TRAVEL]: "umbrella-beach",
	};

	const styles = getStyles(category);

	return (
		<View style={styles.container}>
			<Icon
				name={iconMap[category]}
				style={[styles.icon]}
				size={16} // Adjust icon size as needed
				color="white"
			/>
		</View>
	);
}

function categoryToColor(category: GroupCategory) {
	switch (category) {
		case GroupCategory.FAMILY:
			return "#a78bfa";
		case GroupCategory.WORK:
			return "#fb923c";
		case GroupCategory.FRIENDS:
			return "#338EF7";
		case GroupCategory.TRAVEL:
			return "#45D483";
		default:
			return "gray";
	}
}
