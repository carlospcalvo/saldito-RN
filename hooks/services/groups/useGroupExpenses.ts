import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";

const getGroupExpenses = async (id: string) => {
	const { data, error } = await supabase
		.from("expenses")
		.select(`*, expense_participants(*)`)
		.eq("group_id", id);

	if (error) {
		console.error("Error fetching group expenses", error.message);
		throw error;
	}

	return data;
};

/**
 * Hook that queries a group's expenses.
 * @param id Group ID.
 * @returns A group's expenses.
 */
export default function useGroupExpenses(id: string) {
	return useQuery({
		queryKey: ["groupExpenses"],
		queryFn: () => getGroupExpenses(id),
	});
}
