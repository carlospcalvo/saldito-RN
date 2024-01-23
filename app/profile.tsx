import supabase from "@lib/supabase";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		supabase.auth.getUser().then(({ data: { user }, error }) => {
			setUser(user);
			if (error) {
				Alert.alert("Error al obtener usuario", error.message);
			}
		});
	}, []);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			Alert.alert("Error al cerrar sesión", error.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text>Profile</Text>
			<View
				style={{
					padding: 16,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 16,
				}}
			>
				<Text>{user?.id}</Text>
				<Text>{JSON.stringify(user?.user_metadata, null, 2)}</Text>
				<TouchableOpacity onPress={handleLogout}>
					<Text>Cerrar sesión</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
