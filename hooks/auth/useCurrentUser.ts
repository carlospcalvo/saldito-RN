import supabase from "@lib/supabase";
import { useQuery } from "@tanstack/react-query";

const getUser = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};

export default function useCurrentUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => getUser(),
	});
}
