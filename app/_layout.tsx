import { useEffect, useState } from "react";
import { Button, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import {
	Raleway_100Thin,
	Raleway_100Thin_Italic,
	Raleway_200ExtraLight,
	Raleway_200ExtraLight_Italic,
	Raleway_300Light,
	Raleway_300Light_Italic,
	Raleway_400Regular,
	Raleway_400Regular_Italic,
	Raleway_500Medium,
	Raleway_500Medium_Italic,
	Raleway_600SemiBold,
	Raleway_600SemiBold_Italic,
	Raleway_700Bold,
	Raleway_700Bold_Italic,
	Raleway_800ExtraBold,
	Raleway_800ExtraBold_Italic,
	Raleway_900Black,
	Raleway_900Black_Italic,
} from "@expo-google-fonts/raleway";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { ThemeContext, ThemeKey } from "@contexts/ThemeContext";
import { GroupContextProvider } from "@contexts/GroupContext";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		...FontAwesome.font,
		Raleway_300Light,
		Raleway_300Light_Italic,
		Raleway_400Regular,
		Raleway_400Regular_Italic,
		Raleway_500Medium,
		Raleway_500Medium_Italic,
		Raleway_600SemiBold,
		Raleway_700Bold,
		Raleway_800ExtraBold,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();
	const router = useRouter();
	const queryClient = new QueryClient();
	const [theme, setTheme] = useState<ThemeKey>(colorScheme as ThemeKey);

	const toggleTheme = () => {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<ApplicationProvider {...eva} theme={eva[theme as ThemeKey]}>
				<QueryClientProvider client={queryClient}>
					<Stack>
						<Stack.Screen
							name="index"
							options={{
								headerBackVisible: false,
							}}
						/>
						<Stack.Screen
							name="auth"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="groups"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="profile"
							options={{ title: "Tu perfil" }}
						/>
						<Stack.Screen
							name="(transaction-detail)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="modal"
							options={{
								presentation: "modal",
								headerLeft: () => (
									<Button
										title="Cerrar"
										onPress={() => router.back()}
									/>
								),
								headerRight: () => (
									<Button
										title="OK"
										onPress={() => router.back()}
									/>
								),
							}}
						/>
					</Stack>
				</QueryClientProvider>
			</ApplicationProvider>
		</ThemeContext.Provider>
	);
}
