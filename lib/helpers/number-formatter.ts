const currencyFormatter = new Intl.NumberFormat("es-AR", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
	currency: "ARS",
	style: "currency",
});

const roundedCurrencyFormatter = new Intl.NumberFormat("es-AR", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	currency: "ARS",
	style: "currency",
});

const decimalFormatter = new Intl.NumberFormat("es-AR", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("es-AR", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
	style: "percent",
});

const discountFormatter = new Intl.NumberFormat("es-AR", {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	style: "percent",
});

export const formatCurrency = (value = 0): string =>
	currencyFormatter.format(value);

export const formatDecimal = (value: string | number) => {
	if (typeof value === "string") {
		return decimalFormatter.format(removeFormatting(value));
	}

	return decimalFormatter.format(value);
};

export const removeFormatting = (value: string) => {
	if (!value) {
		return 0;
	}
	const formattedString = value.replace(/\./g, "").replace(/,/, ".");
	return parseFloat(formattedString);
};

export const formatCurrencyRounded = (value = 0): string =>
	roundedCurrencyFormatter.format(value);

export const formatPercent = (value = 0): string =>
	percentFormatter.format(value);

export const formatDiscount = (value = 0): string =>
	discountFormatter.format(value);

export function numberIsFormatted(value: string): boolean {
	const regex = /^(\d+(?:\.\d{3})*|\d{3}(?:,\d{3})*)(?:\.\d{1,2})?$/;
	return regex.test(value);
}

export function canBeFormatted(value: string): boolean {
	const regex = /^[-+]?(\d+(?:\.\d{3})*|\d{3}(?:,\d{3})*)(?:\,\d{1,2})?$/;
	return regex.test(value);
}
