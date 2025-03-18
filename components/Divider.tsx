import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export default function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
	return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
	divider: {
		borderBottomColor: "grey",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
