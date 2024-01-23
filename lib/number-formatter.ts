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

export const formatCurrency = (value: number): string =>
	currencyFormatter.format(value);

export const formatCurrencyRounded = (value: number): string =>
	roundedCurrencyFormatter.format(value);

export const formatPercent = (value: number): string =>
	percentFormatter.format(value);

export const formatDiscount = (value: number): string =>
	discountFormatter.format(value);
