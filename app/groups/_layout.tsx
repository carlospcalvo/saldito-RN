import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Button, TouchableOpacity, Alert } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";

export default function GroupsLayout() {
	const { id } = useLocalSearchParams();
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Tus grupos",
					headerBackVisible: false,
					headerTitleStyle: {
						fontFamily: "Raleway_700Bold",
					},
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "",
					headerTitle: undefined,
					headerBackVisible: true,
					headerBackTitle: "Volver",
					headerRight: () => (
						<TouchableOpacity
							onPress={() =>
								id
									? router.push(
											`/groups/${id}/settings-modal`
									  )
									: Alert.alert(
											"Error",
											"Seleccioná un grupo"
									  )
							}
						>
							<Icon name="gear" color="black" size={26} />
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
}
