import supabase from "@lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

interface NewUser {
	name: string;
	email: string;
	password: string;
}

const createUser = async (user: NewUser) => {
	const { data, error: signUpError } = await supabase.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			emailRedirectTo: `${location.origin}/auth/callback`,
			data: {
				name: user.name,
			},
		},
	});

	if (signUpError) {
		Alert.alert("Error al crear usuario", signUpError.message);
	}

	return data;
};

export default function useCreateUser(user: NewUser) {
	return useMutation<
		{ user: User | null; session: Session | null },
		Error,
		NewUser
	>({
		mutationFn: () => createUser(user),
	});
}
