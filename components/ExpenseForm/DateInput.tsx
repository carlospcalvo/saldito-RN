import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
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
				<Pressable
					style={({ pressed }) => [
						styles.button,
						pressed && styles.buttonPressed,
					]}
					onPress={toggleDatePicker}
				>
					<Icon name="calendar-days" style={styles.icon} />
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
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		borderRadius: 8,
		// backgroundColor: "#dcdee0",
		backgroundColor: "white",
		paddingVertical: 4,
		paddingHorizontal: 8,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	buttonPressed: {
		opacity: 0.5,
	},
	icon: {
		color: "#a955f7",
	},
	currentValueText: {
		fontFamily: "Raleway_400Regular",
	},
});
