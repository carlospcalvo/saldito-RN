import { useEffect, useState } from "react";
import { Button, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { useFonts } from "expo-font";
import {
	Raleway_300Light,
	Raleway_300Light_Italic,
	Raleway_400Regular,
	Raleway_400Regular_Italic,
	Raleway_500Medium,
	Raleway_500Medium_Italic,
	Raleway_600SemiBold,
	Raleway_700Bold,
	Raleway_800ExtraBold,
} from "@expo-google-fonts/raleway";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { ThemeContext, ThemeKey } from "@contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage,
});

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
		// ...FontAwesome.font,
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

	const [theme, setTheme] = useState<ThemeKey>(colorScheme as ThemeKey);

	const toggleTheme = () => {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<ApplicationProvider {...eva} theme={eva[theme as ThemeKey]}>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister: asyncStoragePersister }}
				>
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
							name="new-expense-payers"
							options={{
								presentation: "modal",
								title: "¿Quién pagó?",
								headerTitleStyle: {
									fontFamily: "Raleway_700Bold",
								},
								headerLeft: () => (
									<Button
										title="Cancelar"
										onPress={() => router.back()}
									/>
								),
								// Add a placeholder button without the `onPress` to avoid flicker
								headerRight: () => <Button title="Guardar" />,
							}}
						/>
						<Stack.Screen
							name="new-expense-debtors"
							options={{
								presentation: "modal",
								title: "¿Quiénes participaron?",
								headerTitleStyle: {
									fontFamily: "Raleway_700Bold",
								},
								headerLeft: () => (
									<Button
										title="Cancelar"
										onPress={() => router.back()}
									/>
								),
								// Add a placeholder button without the `onPress` to avoid flicker
								headerRight: () => <Button title="Guardar" />,
							}}
						/>
					</Stack>
				</PersistQueryClientProvider>
			</ApplicationProvider>
		</ThemeContext.Provider>
	);
}
