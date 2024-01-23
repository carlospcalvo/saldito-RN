import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Group } from "@lib/types";
import AvatarList from "./AvatarList";

export default function GroupDetailHeader({ group }: { group?: Group }) {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={{ width: "auto", height: 88, ...styles.image }}
					source={{
						uri: group?.image,
					}}
					contentFit="cover"
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{group?.name}</Text>
				<AvatarList users={group?.members ?? []} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 120,
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 16,
		backgroundColor: "#fff",
	},
	imageContainer: {
		width: "33%",
		height: 88,
		borderRadius: 10,
		marginRight: 16,
	},
	image: {
		borderRadius: 10,
		flex: 1,
		backgroundColor: "#0553",
	},
	textContainer: {
		flexDirection: "column",
		gap: 8,
	},
	title: {
		fontSize: 24,
		fontFamily: "Raleway_600SemiBold",
	},
	subtitle: {
		fontSize: 16,
		fontFamily: "Raleway_400Regular",
	},
});
