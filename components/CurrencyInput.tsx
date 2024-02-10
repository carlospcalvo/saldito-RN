import {
	formatDecimal,
	numberIsFormatted,
} from "@lib/helpers/number-formatter";
import React, { useState } from "react";
import {
	StyleProp,
	StyleSheet,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";

interface CurrencyInputProps {
	value?: string | undefined;
	defaultValue?: string | undefined;
	onChangeText: ((text: string) => void) | undefined;
	disabled?: boolean;
	prefix?: string;
	customStyles?: {
		container?: StyleProp<ViewStyle>;
		prefix?: StyleProp<TextStyle>;
		input?: StyleProp<TextStyle>;
	};
}

export default function CurrencyInput({
	value,
	defaultValue,
	onChangeText,
	disabled = false,
	prefix = "$",
	customStyles,
}: CurrencyInputProps) {
	return (
		<View style={[styles.container, customStyles?.container]}>
			{prefix && (
				<Text
					style={[
						styles.prefix,
						customStyles?.prefix,
						disabled && styles.disabledPrefix,
					]}
				>
					{prefix}
				</Text>
			)}
			<TextInput
				keyboardType="decimal-pad"
				placeholder="Monto"
				editable={!disabled}
				defaultValue={defaultValue}
				value={value}
				style={[
					styles.input,
					customStyles?.input,
					disabled && styles.disabledInput,
				]}
				onChangeText={(text: string) => {
					if (onChangeText) {
						onChangeText(text);
					}
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	prefix: {
		paddingRight: 4,
		fontFamily: "Raleway_400Regular",
	},
	disabledPrefix: {
		color: "grey",
	},
	input: {
		paddingVertical: 2,
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
		fontFamily: "Raleway_400Regular",
	},
	disabledInput: {
		color: "grey",
		borderBottomColor: "grey",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
