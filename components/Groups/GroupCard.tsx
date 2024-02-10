import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Group } from "@lib/types";
import CornerRibbon from "../CornerRibbon";
import BalanceText from "../BalanceText";

interface GroupCardProps {
	group: Group;
	onPress: () => void; // Added onPress prop for navigation
}

export default function GroupCard({ group, onPress }: GroupCardProps) {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.imageContainer}>
				<Image
					style={{ width: 64, height: 64, ...styles.image }}
					source={{
						uri: group.image,
					}}
					contentFit="cover"
				/>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{group.name}</Text>
				<BalanceText balance={group.userBalance} isCurrentUser={true} />
			</View>
			<CornerRibbon category={group.category} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderRadius: 10,
		marginBottom: 16,
		backgroundColor: "white",
		borderColor: "grey",
		borderWidth: 0.5,
		overflow: "hidden",
	},
	imageContainer: {
		width: 64,
		height: 64,
		borderRadius: 10,
		marginRight: 16,
	},
	image: {
		borderRadius: 10,
		flex: 1,
		backgroundColor: "#0553",
	},
	contentContainer: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontFamily: "Raleway_700Bold",
	},
});
