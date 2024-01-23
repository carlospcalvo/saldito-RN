import { useEffect } from "react";
import { router } from "expo-router";
import supabase from "@lib/supabase";
import { Alert } from "react-native";

export default function Page() {
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session }, error }) => {
			if (error) {
				Alert.alert("Error al iniciar sesión", error.message);
			}
			if (session) {
				router.replace("/groups");
			}
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			if (session) {
				router.replace("/groups");
			} else {
				router.replace("/auth/login");
			}
		});
		return () => {};
	}, []);
}
