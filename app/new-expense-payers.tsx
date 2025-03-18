import useCurrentUser from "@hooks/auth/useCurrentUser";
import useGroupMembers from "@hooks/services/groups/useGroupMembers";
import { moveToFront } from "@lib/helpers/array-helpers";
import { UserID } from "@lib/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
	Button,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function ModalScreen() {
	const { groupId } = useLocalSearchParams<{
		groupId: string;
	}>();
	const navigation = useNavigation();
	const { data: members } = useGroupMembers(groupId);
	const { data: currentUser } = useCurrentUser();
	const [selectedUser, setSelectedUser] = useState<UserID | undefined>(
		currentUser?.id
	);

	useEffect(() => {
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
			<ScrollView>
				<Text style={styles.title}>Acá van los que pagan</Text>
				<Text>{JSON.stringify(members, null, 4)}</Text>

				{/* <View style={styles.separator} />
			<Text>Count: {count}</Text>
			<Button
				title="Increment"
				onPress={() => setCount((prev) => prev + 1)}
			/> */}
			</ScrollView>
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
