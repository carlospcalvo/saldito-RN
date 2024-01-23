import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";

const getGroupPayments = async (id: string) => {
	const { data, error } = await supabase
		.from("payments")
		.select(`*`)
		.eq('group_id', id);

	if (error) {
		console.error('Error fetching group payments',error.message)
		throw error;
	}

	return data;
}

/**
 * Hook that queries a group's payments.
 * @param id Group ID.
 * @returns A group's payments.
 */
export default function useGroupPayments(id: string) {
	return useQuery({
		queryKey: ["groupPayments"],
		queryFn: () => getGroupPayments(id),
		retry: 5,
	});
}