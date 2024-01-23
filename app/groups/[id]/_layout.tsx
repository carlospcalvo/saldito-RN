import React from "react";
import { Stack, router } from "expo-router";
import { Button } from "react-native";

export default function GroupDetailLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen
				name="settings-modal"
				options={{
					presentation: "modal",
					headerShown: true,
					title: "Configurar grupo",
					headerLeft: () => (
						<Button title="Cerrar" onPress={() => router.back()} />
					),
					headerRight: () => (
						<Button title="OK" onPress={() => router.back()} />
					),
				}}
			/>
		</Stack>
	);
}
