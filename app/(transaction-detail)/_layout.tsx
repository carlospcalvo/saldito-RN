import React from "react";
import { View, Text, Alert } from "react-native";
import { Stack, router } from "expo-router";
import BackButton from "@components/BackButton";
import useExpenseStore from "@lib/expense-store";

export default function TransactionDetailLayout() {
	const resetExpenseForm = useExpenseStore((state) => state.reset);
	return (
		<Stack>
			<Stack.Screen
				name="expense/[id]"
				options={{
					title: "Detalle del gasto",
					headerLeft: () => (
						<BackButton onPress={() => router.back()} />
					),
					headerTitleStyle: {
						fontFamily: "Raleway_700Bold",
					},
				}}
			/>
			<Stack.Screen
				name="expense/new"
				options={{
					title: "Nuevo gasto",
					headerLeft: () => (
						<BackButton
							onPress={() => {
								resetExpenseForm();
								router.back();
							}}
						/>
					),
					headerTitleStyle: {
						fontFamily: "Raleway_700Bold",
					},
				}}
			/>
			<Stack.Screen
				name="payment/[id]"
				options={{
					title: "Detalle del pago",
					headerLeft: () => (
						<BackButton onPress={() => router.back()} />
					),
					headerTitleStyle: {
						fontFamily: "Raleway_700Bold",
					},
				}}
			/>
		</Stack>
	);
}
