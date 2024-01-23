import React, { useState } from "react";
import { Alert, ImageProps, StyleSheet, View } from "react-native";
import supabase from "@lib/supabase";
import { Button, /* Icon, */ Input } from "@ui-kitten/components";
import {
	RenderProp,
	TouchableWithoutFeedback,
} from "@ui-kitten/components/devsupport";
import Icon from "@expo/vector-icons/FontAwesome6";
import useOAuthSignIn from "@hooks/auth/useOAuthSignIn";
import usePasswordLogin from "@hooks/auth/usePasswordLogin";

export default function Login() {
	const passwordLoginMutation = usePasswordLogin();
	const OAuthSignInMutation = useOAuthSignIn();
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const toggleSecureEntry = (): void => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = (props: { [x: string]: any }): React.ReactElement => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon
				{...props}
				name={secureTextEntry ? "eye-slash" : "eye"}
				size={22}
				style={{ marginTop: 1, paddingRight: 4 }}
				color="grey"
			/>
		</TouchableWithoutFeedback>
	);

	return (
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					onChangeText={(email) =>
						setFormState((prev) => ({ ...prev, email }))
					}
					value={formState.email}
					placeholder="email@address.com"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Contraseña"
					onChangeText={(password) =>
						setFormState((prev) => ({ ...prev, password }))
					}
					value={formState.password}
					accessoryRight={
						renderIcon as RenderProp<Partial<ImageProps>>
					}
					secureTextEntry={!secureTextEntry}
					placeholder="********"
					autoCapitalize="none"
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					disabled={passwordLoginMutation.isPending}
					onPress={() => passwordLoginMutation.mutate(formState)}
				>
					Iniciar sesión
				</Button>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					disabled={passwordLoginMutation.isPending}
					onPress={() => OAuthSignInMutation.mutate("google")}
				>
					Ingresar con Google
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
});
