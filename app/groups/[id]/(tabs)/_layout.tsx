import React, { useState } from "react";
import GroupDetailHeader from "@components/Groups/GroupDetailHeader";
import { useGroupContext } from "@contexts/GroupContext";
import simplifyDebts from "@lib/debt_simplifier";
import {
	MaterialTopTabNavigationEventMap,
	MaterialTopTabNavigationOptions,
	createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { router, useLocalSearchParams, withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator);

export default function GroupTabsLayout() {
	return (
		<>
			<GroupDetailHeader />
			<MaterialTopTabs
				screenOptions={{
					tabBarIndicatorStyle: {
						backgroundColor: "green",
					},
					tabBarLabelStyle: {
						textTransform: "capitalize",
						fontSize: 18,
						fontFamily: "Raleway_500Medium",
					},
				}}
			>
				<MaterialTopTabs.Screen
					name="expenses"
					options={{ title: "Gastos" }}
				/>
				<MaterialTopTabs.Screen
					name="balances"
					options={{ title: "Balances" }}
				/>
			</MaterialTopTabs>
		</>
	);
}
