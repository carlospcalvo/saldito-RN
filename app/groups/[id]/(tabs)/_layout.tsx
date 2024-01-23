import GroupDetailHeader from "@components/GroupDetailHeader";
import { useGroupContext } from "@contexts/GroupContext";
import {
	MaterialTopTabNavigationEventMap,
	MaterialTopTabNavigationOptions,
	createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useLocalSearchParams, withLayoutContext } from "expo-router";
import React from "react";

const { Navigator, Screen } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator);

export default function GroupTabsLayout() {
	const { id } = useLocalSearchParams();
	const { groups } = useGroupContext();
	const currentGroup = groups?.find((group) => group.id === id);
	return (
		<>
			<GroupDetailHeader group={currentGroup} />
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
