import supabase from "@lib/supabase";
import { Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { makeRedirectUri } from "expo-auth-session";
// import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";

// WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri({
	scheme: 'saldito',
	path: 'exp://127.0.0.1:8081/--/'
});

// const createSessionFromUrl = async (url: string) => {
//   const { params, errorCode } = QueryParams.getQueryParams(url);

//   if (errorCode) throw new Error(errorCode);
//   const { access_token, refresh_token } = params;

//   if (!access_token) return;

//   const { data, error } = await supabase.auth.setSession({
//     access_token,
//     refresh_token,
//   });
//   if (error) throw error;
//   return data.session;
// };

const signIn = async (provider: Provider) => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
	});

	if (error) {
		console.error(`Error al iniciar sesión con ${provider.toUpperCase()}`, error.message)
		Alert.alert(`Error al iniciar sesión con ${provider.toUpperCase()}`, error.message);
	}

	console.log(data);
};

export default function useOAuthSignIn() {
	return useMutation({ mutationFn: signIn });
}
