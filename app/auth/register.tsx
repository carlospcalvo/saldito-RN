import React, { useState } from "react";
import { Alert, ImageProps, StyleSheet, View } from "react-native";
import supabase from "@lib/supabase";
import { Button, Input } from "@ui-kitten/components";
import {
	RenderProp,
	TouchableWithoutFeedback,
} from "@ui-kitten/components/devsupport";
import Icon from "@expo/vector-icons/FontAwesome6";

export default function Login() {
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
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

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: formState.email,
			password: formState.password,
		});

		if (error) Alert.alert(error.message);
		if (!session)
			Alert.alert("Please check your inbox for email verification!");
		setLoading(false);
	}

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
				<Button disabled={loading} onPress={signUpWithEmail}>
					Crear cuenta
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
