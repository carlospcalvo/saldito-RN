import React from "react";
import ExpenseParticipant from "@components/ExpenseDetail/ExpenseParticipant";
import Dimensions from "@constants/Dimensions";
import useExpense from "@hooks/services/expenses/useExpense";
import { mapParticipants } from "@lib/helpers/array-helpers";
import { formatCurrency } from "@lib/helpers/number-formatter";
import { isExpenseDetailParticipant } from "@lib/types";
import { FlashList } from "@shopify/flash-list";
import { add, format, intlFormat } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import {
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function ExpenseDetailScreen() {
	const { id, groupId } = useLocalSearchParams<{
		id: string;
		groupId: string;
	}>();
	const { data: expense, isLoading } = useExpense(id);

	if (isLoading) {
		return (
			<View style={styles.mainContainer}>
				<ActivityIndicator
					style={{ width: 50, height: 50 }}
					size={"large"}
					color={"green"}
				/>
			</View>
		);
	}

	const mappedParticipants = mapParticipants(expense?.participants ?? []);

	const stickyHeaderIndices = mappedParticipants
		?.map((item, index) => {
			if (typeof item === "string") {
				return index;
			} else {
				return null;
			}
		})
		.filter((item) => item !== null) as number[];

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<View style={styles.mainContainer}>
					<Text style={styles.expenseDate}>
						{format(expense!.date, "dd/MM/yyyy")}
					</Text>
					<Text style={styles.description}>
						{expense?.description}
					</Text>
					<Text style={styles.amount}>
						{formatCurrency(expense?.amount)}
					</Text>
					{expense?.created_at && (
						<Text style={styles.creationDate}>{`Creado por ${
							expense?.created_by
						} el ${intlFormat(
							add(expense?.created_at, { hours: 3 }),
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
				<View
					style={{
						borderBottomColor: "grey",
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				<View style={styles.participantContainer}>
					<FlashList
						data={mappedParticipants}
						renderItem={({ item }) =>
							isExpenseDetailParticipant(item) ? (
								<ExpenseParticipant
									participant={item}
									isReadOnly
								/>
							) : (
								<Text
									style={{
										fontSize: 18,
										fontFamily: "Raleway_600SemiBold",
										padding: 12,
									}}
								>
									{item}
								</Text>
							)
						}
						getItemType={(item) =>
							isExpenseDetailParticipant(item)
								? "row"
								: "sectionHeader"
						}
						stickyHeaderIndices={stickyHeaderIndices}
						estimatedItemSize={50}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 4,
		paddingVertical: 8,
		// backgroundColor: "red",
	},
	expenseDate: {
		fontFamily: "Raleway_400Regular",
		paddingVertical: 4,
	},
	description: {
		fontSize: 30,
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
	participantContainer: {
		paddingVertical: 8,
		minHeight: 2,
		height: Dimensions.screen.height - 160,
		width: Dimensions.screen.width,
	},
});

const data = {
	id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
	description: "Comida",
	amount: 5000,
	date: "2024-01-19",
	created_at: "2024-01-19T14:27:55.397978+00:00",
	created_by: "Juan Pérez",
	group_id: "baa429da-9116-4437-8335-be4fb1b3d81d",
	participants: [
		{
			expense_id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
			id: "9cda8f62-c696-4c77-8a4a-523496c91dc7",
			name: "Jane Doe",
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
			credit: 0,
			debt: 1500,
		},
		{
			expense_id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
			id: "3161ff50-973a-4cf1-89f7-dfc705b83542",
			name: "Carlos Calvo Nazábal",
			avatar: "https://lh3.googleusercontent.com/a/ACg8ocJuyLScnimTZt0icHShNTeo_V7g9xF9OjJr1zsFN363dVUl=s96-c",
			credit: 3000,
			debt: 2000,
		},
		{
			expense_id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
			id: "1ca3b15b-8536-484d-a657-eccbded1581b",
			name: "Juan Pérez",
			avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
			credit: 2000,
			debt: 1500,
		},
	],
};

const data2 = {
	id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
	description: "Comida",
	amount: 5000,
	date: "2024-01-19",
	created_at: "2024-01-19T14:27:55.397978+00:00",
	created_by: "Juan Pérez",
	group_id: "baa429da-9116-4437-8335-be4fb1b3d81d",
	participants: [
		{
			expense_id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
			id: "1ca3b15b-8536-484d-a657-eccbded1581b",
			name: "Juan Pérez",
			avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
			credit: 2000,
			debt: 1500,
		},
		{
			expense_id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
			id: "3161ff50-973a-4cf1-89f7-dfc705b83542",
			name: "Carlos Calvo Nazábal",
			avatar: "https://lh3.googleusercontent.com/a/ACg8ocJuyLScnimTZt0icHShNTeo_V7g9xF9OjJr1zsFN363dVUl=s96-c",
			credit: 3000,
			debt: 2000,
		},
		{
			expense_id: "47392fee-1d97-464b-b65b-f87d4046fc8f",
			id: "9cda8f62-c696-4c77-8a4a-523496c91dc7",
			name: "Jane Doe",
			avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
			credit: 0,
			debt: 1500,
		},
	],
};
