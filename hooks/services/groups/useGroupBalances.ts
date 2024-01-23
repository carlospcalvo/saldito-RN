import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";

const getGroupBalances = async (id: string) => {
	const { data, error } = await supabase
		.from("members")
		.select(`*, profile:profiles(
					avatar, 
					name
				)`)
		.eq('group_id', id);

	if (error) {
		console.error('Error fetching group balances', error.message)
		throw error;
	}

	return data;
}

/**
 * Hook that queries a group's balances.
 * @param id Group ID.
 * @returns A group's balances.
 */
export default function useGroupBalances(id: string) {
	return useQuery({
		queryKey: ["groupBalances"],
		queryFn: () => getGroupBalances(id),
		retry: 5,
	});
}