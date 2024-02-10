import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";

const getGroupMembers = async (id: string) => {
	const { data, error } = await supabase
		.from("members")
		.select(
			`*, profile:profiles(
					avatar, 
					name
				)`
		)
		.eq("group_id", id);

	if (error) {
		console.error("Error fetching group members", error.message);
		throw error;
	}

	return data;
};

/**
 * Hook that queries a group's members.
 * @param id Group ID.
 * @returns A group's members.
 */
export default function useGroupMembers(id: string) {
	return useQuery({
		queryKey: ["groupMembers"],
		queryFn: () => getGroupMembers(id),
		retry: 5,
	});
}
