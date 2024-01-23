import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";
import { Expense, Group, Member, Payment } from "@lib/types";
import { useQuery } from "@tanstack/react-query";

const getUserGroups = async (): Promise<Group[]> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await supabase
		.from("groups")
		.select(
			`
			id, 
			name, 
			category,
			image,
			simplifyDebts:simplify_debts,
			members(
				user_id,
				profile:profiles(
					avatar, 
					name
				),
				is_admin,
				balance
			),
			expenses(
				*,
				expense_participants(*)
			),
			payments(
				id,
				created_at,
				amount,
				currency,
				date,
				from_user,
				to_user
			)	
		`
		)
		.returns<Partial<Group>[]>();

	if (error) {
		console.error('Error fetching user groups',error.message)
		throw error;
	}

	const formattedData = data.map((group) => ({
		id: group.id,
		name: group.name,
		category: group.category,
		image: `${SUPABASE_URL}/storage/v1/object/public/group_avatars/${group.image}`.trim(),
		simplifyDebts: group.simplifyDebts,
		members: group.members as Member[],
		expenses: group.expenses as Expense[],
		payments: group.payments as Payment[],
		userBalance: group?.members?.find(
			(member) => member.user_id === user?.id
		)?.balance,
	}));

	return formattedData as Group[];
};

export default function useUserGroups() {
	return useQuery({
		queryKey: ["userGroup"],
		queryFn: () => getUserGroups(),
		retry: 5,
	});
}
