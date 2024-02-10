import React from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Icon from "@expo/vector-icons/FontAwesome6";
import usePayment from "@hooks/services/payments/usePayment";
import { formatCurrency } from "@lib/helpers/number-formatter";
import { add, format, intlFormat } from "date-fns";

export default function PaymentDetailScreen() {
	const { id, groupId } = useLocalSearchParams<{
		id: string;
		groupId: string;
	}>();
	const { data: payment, isLoading } = usePayment(id);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator
					style={{ width: 50, height: 50 }}
					size={"large"}
					color={"green"}
				/>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* <View style={styles.container}> */}
			<View style={styles.mainContainer}>
				<Text style={styles.expenseDate}>
					{format(payment!.date, "dd/MM/yyyy")}
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: 8,
					}}
				>
					<Text style={styles.user}>{payment?.from_user.name}</Text>
					<Icon name="right-long" size={20} />
					<Text style={styles.user}>{payment?.to_user.name}</Text>
				</View>
				<Text style={styles.amount}>
					{formatCurrency(payment?.amount)}
				</Text>
				{payment?.created_at && (
					<Text style={styles.creationDate}>{`Creado por ${
						payment?.created_by.name
					} el ${intlFormat(
						add(payment?.created_at, { hours: 3 }),
						{
							year: "numeric",
							month: "long",
							day: "numeric",
						},
						{
							locale: "es-AR",
						}
					)}`}</Text>
				)}
			</View>

			{/* <Text>{JSON.stringify(payment, null, 2)}</Text> */}
			{/* </View> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// borderColor: "red",
		// borderWidth: 1,
	},
	mainContainer: {
		flex: 1,
		width: "100%",
		// justifyContent: "center",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 8,
		// paddingVertical: 8,
		// paddingBottom: 16,
		// borderColor: "blue",
		// borderWidth: 1,
	},
	expenseDate: {
		fontFamily: "Raleway_400Regular",
		paddingVertical: 4,
	},
	user: {
		fontSize: 18,
		fontFamily: "Raleway_500Medium",
	},
	amount: {
		fontSize: 28,
		fontFamily: "Raleway_500Medium",
	},
	creationDate: {
		fontSize: 12,
		paddingVertical: 4,
		fontFamily: "Raleway_400Regular",
	},
});

const test = {
	amount: 500,
	created_at: "2024-01-26T17:28:17.680604+00:00",
	currency: "ARS",
	date: "2024-01-26",
	from_user: {
		avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
		id: "1ca3b15b-8536-484d-a657-eccbded1581b",
		name: "Juan Pérez",
	},
	group_id: "baa429da-9116-4437-8335-be4fb1b3d81d",
	id: "64b2558c-11ef-4831-8f53-f2d86a8899e9",
	to_user: {
		avatar: "https://lh3.googleusercontent.com/a/ACg8ocJuyLScnimTZt0icHShNTeo_V7g9xF9OjJr1zsFN363dVUl=s96-c",
		id: "3161ff50-973a-4cf1-89f7-dfc705b83542",
		name: "Carlos Calvo Nazábal",
	},
};
