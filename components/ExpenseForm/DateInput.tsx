import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { format, parseISO } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useExpenseStore from "@lib/expense-store";

export default function DateInput() {
	const [date, setDate] = useExpenseStore((state) => [
		state.date,
		state.setDate,
	]);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const hanldeDateConfirm = (selectedDate: Date) => {
		setDate(selectedDate);
		toggleDatePicker();
	};

	const toggleDatePicker = () => {
		setDatePickerVisibility((prev) => !prev);
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.label}>Fecha:</Text>
				<Pressable
					style={({ pressed }) => [
						styles.button,
						pressed && styles.buttonPressed,
					]}
					onPress={toggleDatePicker}
				>
					<Text style={styles.currentValueText}>
						{format(parseISO(date), "dd/MM/yyyy")}
					</Text>
				</Pressable>
			</View>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				display="inline"
				mode="date"
				maximumDate={new Date()}
				onConfirm={hanldeDateConfirm}
				onCancel={toggleDatePicker}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	label: {
		fontFamily: "Raleway_500Medium",
	},
	button: {
		borderRadius: 8,
		backgroundColor: "#dcdee0",
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	buttonPressed: {
		opacity: 0.5,
	},
	currentValueText: {
		fontFamily: "Raleway_400Regular",
	},
});
