import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Member } from "@lib/types";
import { Avatar } from "@ui-kitten/components";

interface AvatarListProps {
	users: Member[];
}

const MAX_AVATARS_SHOWN = 5;

export default function AvatarList({ users }: AvatarListProps) {
	if (!users.length) {
		return null;
	}

	const shownAvatars = users.slice(0, MAX_AVATARS_SHOWN);
	const remainingAvatars = users.slice(MAX_AVATARS_SHOWN).length;

	return (
		<View style={styles.container}>
			{shownAvatars.map((user, index) => (
				<Avatar
					key={`${index}${user.user_id}`}
					source={{ uri: user.profile.avatar }}
					style={[styles.avatar, { height: 40, width: 40 }]}
				/>
			))}
			{remainingAvatars > 0 && (
				<View style={styles.remainingAvatars}>
					<Text
					// style={{ color: "white" }}
					>{`+${remainingAvatars}`}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		marginRight: -10,
	},
	remainingAvatars: {
		backgroundColor: "#86bf60",
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 1000,
	},
});
