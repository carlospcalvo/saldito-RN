import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";
import { ExpenseCategory } from "@lib/types";

const getExpenseCategories = async (): Promise<ExpenseCategory[]> => {
	const { data, error } = await supabase.from("categories").select(`*`);

	if (error) {
		console.error("Error fetching expense categories", error.message);
		throw error;
	}

	return data;
};

/**
 * Hook that queries a group's expenses.
 * @param id Group ID.
 * @returns A group's expenses.
 */
export default function useExpenseCategories() {
	return useQuery({
		queryKey: ["expenseCategories"],
		queryFn: () => getExpenseCategories(),
	});
}
