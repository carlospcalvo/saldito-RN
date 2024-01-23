import supabase from "@lib/supabase";
import { Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

const signIn = async (provider: Provider) => {
	console.log(`signing in with ${provider}...`);
	await supabase.auth.signInWithOAuth({
		provider,
	});
	console.log(`signed in with ${provider}`);
};

export default function useOAuthSignIn() {
	return useMutation({ mutationFn: signIn });
}
