import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import { moveToFront } from "@lib/helpers/array-helpers";
import supabase from "@lib/supabase";
import { Member } from "@lib/types";

const getGroupMembers = async (id: string): Promise<Member[]> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
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

	return moveToFront(data, user?.id ?? "", "user_id") as Member[];
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
	});
}
