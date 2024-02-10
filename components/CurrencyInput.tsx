import React from "react";
import { StyleProp, StyleSheet, TextInputProps, TextStyle } from "react-native";
import MoneyInput from "@inkindcards/react-native-money";
import { Overwrite } from "@lib/types";

interface CustomTextInputProps {
	value?: number | undefined;
	defaultValue?: number | undefined;
	onChangeText?: (value: number) => void;
	disabled?: boolean;
	style?: StyleProp<TextStyle>;
}

interface CurrencyInputProps
	extends Overwrite<TextInputProps, CustomTextInputProps> {}

export default function CurrencyInput({
	value,
	defaultValue,
	onChangeText,
	disabled = false,
	style,
	...props
}: CurrencyInputProps) {
	return (
		<MoneyInput
			locale="es_AR"
			placeholder="$0,00"
			{...props}
			keyboardType="number-pad"
			style={[
				defaultStyles.input,
				style,
				disabled && defaultStyles.disabled,
			]}
			// @ts-ignore
			defaultValue={defaultValue}
			// @ts-ignore
			value={!disabled ? value : 0}
			// @ts-ignore
			onChangeText={(value: number, label: string) => {
				if (onChangeText) {
					onChangeText(value);
				}
			}}
		/>
	);
}

const defaultStyles = StyleSheet.create({
	input: {
		paddingVertical: 2,
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
		fontFamily: "Raleway_400Regular",
	},
	disabled: {
		color: "grey",
		borderBottomColor: "grey",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
