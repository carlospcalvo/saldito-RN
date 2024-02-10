import React from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Button } from "react-native";
import { GroupContextProvider } from "@contexts/GroupContext";

export default function GroupDetailLayout() {
	const { id } = useLocalSearchParams();

	return (
		<GroupContextProvider id={id as string}>
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
							<Button
								title="Cerrar"
								onPress={() => router.back()}
							/>
						),
						headerRight: () => (
							<Button title="OK" onPress={() => router.back()} />
						),
					}}
				/>
			</Stack>
		</GroupContextProvider>
	);
}
