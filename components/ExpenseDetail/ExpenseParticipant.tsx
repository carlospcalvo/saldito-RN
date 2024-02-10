import { formatCurrency } from "@lib/helpers/number-formatter";
import { ExpenseDetailParticipant } from "@lib/types";
import { Avatar } from "@ui-kitten/components";
import { StyleSheet, Text, View } from "react-native";
import CurrencyInput from "../CurrencyInput";

interface ExpenseParticipantProps {
	participant: ExpenseDetailParticipant;
	isReadOnly?: boolean;
}

export default function ExpenseParticipant({
	participant,
	isReadOnly = false,
}: ExpenseParticipantProps) {
	const { name, avatar, credit, debt } = participant;

	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar
					source={{
						uri: avatar,
					}}
					size="small"
				/>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
					}}
				>
					<Text style={styles.name}>{name}</Text>
					{isReadOnly ? (
						<Text style={styles.contribution}>
							{formatCurrency(credit ?? debt)}
						</Text>
					) : (
						// <CurrencyInput />k
						<Text style={styles.contribution}>
							{formatCurrency(0)}
						</Text>
					)}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	avatarContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	name: {
		fontSize: 16,
		fontFamily: "Raleway_500Medium",
	},
	contribution: {
		fontSize: 16,
		fontFamily: "Raleway_400Regular",
		marginLeft: "auto",
	},
});
