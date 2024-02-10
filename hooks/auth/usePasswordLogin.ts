import supabase from "@lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

interface LoginArgs {
	email: string;
	password: string;
}

const login = async ({ email, password }: LoginArgs) => {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		console.error(error)
		Alert.alert("Error al iniciar sesión", error.message);
	}
};

export default function usePasswordLogin() {
	return useMutation({ mutationFn: login });
}
