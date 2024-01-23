import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="login"
				options={{
					title: "Ingresá",
					headerBackVisible: false,
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					title: "Creá tu cuenta",
					headerBackVisible: false,
				}}
			/>
		</Stack>
	);
}
