import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, Alert } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import BackButton from "@components/BackButton";

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
					headerBackVisible: false,
					headerLeft: () => (
						<BackButton onPress={() => router.push(`/groups`)} />
					),
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
							<Icon name="gear" color="black" size={20} />
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
}
