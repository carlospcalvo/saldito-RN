import React from "react";
import { StyleSheet, View } from "react-native";
import Select from "react-native-picker-select";
import CurrencyList from "currency-list";
import { capitalizeFirstLetter } from "@lib/helpers/string-helpers";
import useExpenseStore from "@lib/expense-store";

const USUAL_CURRENCIES = [
	"ARS",
	"USD",
	"EUR",
	"BRL",
	"UYU",
	"CLP",
	"PYG",
	"PEN",
	"GBP",
];

export default function CurrencyPicker() {
	const [selected, setSelected] = useExpenseStore((state) => [
		state.currency,
		state.setCurrency,
	]);
	const currencies = CurrencyList.getAll("es_AR");
	const prioritizedCurrencies = USUAL_CURRENCIES.map(
		(code) => currencies[code]
	);
	const orderedCurrencies = [
		...prioritizedCurrencies,
		...Object.values(currencies).filter(
			(currency) => !USUAL_CURRENCIES.includes(currency.code)
		),
	];
	const mappedCurrencies = orderedCurrencies.map((currency) => ({
		label: `${currency.code} - ${capitalizeFirstLetter(currency.name)}`,
		value: currency.code,
		inputLabel: currency.code,
	}));

	return (
		<View style={styles.container}>
			<Select
				placeholder={{}}
				value={selected}
				onValueChange={(value) => {
					setSelected(value);
				}}
				items={mappedCurrencies}
				style={pickerSelectStyles}
			/>
		</View>
	);
}

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontFamily: "Raleway_500Medium",
	},
	inputAndriod: {
		fontFamily: "Raleway_500Medium",
	},
});

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 4,
		marginBottom: 8,
		paddingHorizontal: 8,
		paddingVertical: 4,
		backgroundColor: "white",
		borderRadius: 8,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});
