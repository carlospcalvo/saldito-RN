import supabase from "@lib/supabase";
import { UserID } from "@lib/types";
import { useMutation } from "@tanstack/react-query";

interface Participant {
	user_id: UserID;
	amount: number;
	participated_as: "creditor" | "debtor";
}

interface CreateExpenseParams {
	expenseData: {};
	creditors: Participant[];
	debtors: Participant[];
}

const createExpense = async (values: CreateExpenseParams) => {
	// TODO: Implement image upload
	// let imagePath = "";
	// if (values.image) {
	// 	const [_, extension] = values.image.name.split(".");
	// 	const { data: fileData, error: fileError } = await supabase.storage
	// 		.from("group_avatars")
	// 		.upload(`${Date.now()}.${extension}`, values.image, {
	// 			cacheControl: "3600",
	// 			upsert: true,
	// 		});

	// 	if (fileError) {
	// 		throw fileError;
	// 	}

	// 	if (fileData) {
	// 		imagePath = fileData.path;
	// 	}
	// }

	const { data: groupData, error: groupError } = await supabase.rpc(
		"create_expense_with_participants",
		{
			data: values.expenseData,
			creditors: values.creditors,
			debtors: values.debtors,
		}
	);

	if (groupError) {
		throw groupError;
	}

	return groupData[0];
};

export default function useCreateExpense() {
	return useMutation({
		mutationFn: (values: CreateExpenseParams) => createExpense(values),
	});
}
