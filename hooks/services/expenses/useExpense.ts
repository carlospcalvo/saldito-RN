import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";

interface ExpenseDetail {
	id: string;
	description: string;
	amount: number;
	date: string;
	created_at: string;
	created_by: string;
	group_id: string;
	participants: {
		expense_id: string;
		id: string;
		name: string;
		avatar: string;
		credit: number;
		debt: number;
	}[];
}

const getExpense = async (id: string): Promise<ExpenseDetail> => {
	const { data, error } = await supabase.rpc("get_expense_details", {
		expense_id_param: id,
	});

	if (error) {
		console.error("Error fetching expense details", error.message);
		throw error;
	}

	return data;
};

/**
 * Hook that queries an expense.
 * @param id Expense ID.
 * @returns An expense.
 */
export default function useExpense(id: string) {
	return useQuery({
		queryKey: ["expense"],
		queryFn: () => getExpense(id),
		retry: 5,
	});
}
