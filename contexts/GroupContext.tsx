import { Group, Payment, Transactions } from "@lib/types";
import React, { createContext, useContext } from "react";
// import USERS from "@/mock/users";
// import TRANSACTIONS from "@/mock/transactions";
// import { ExpenseInput } from "@/app/groups/[groupId]/new-expense/page";
import useUserGroups from "@hooks/services/groups/useUserGroups";
import { User } from "@supabase/supabase-js";
// import { usePathname, useRouter } from "next/navigation";
import useCurrentUser from "@hooks/auth/useCurrentUser";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface IGroupContext {
	currentUser: User | null | undefined;
	groups: Group[] | undefined;
	isLoading: boolean;
	isRefetching: boolean;
	refetchGroups: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<Group[], Error>>;
	duePayments: Partial<Payment>[];
	// addExpense: (newExpense: ExpenseInput) => void;
}

export interface IContextProvider {
	children: React.ReactNode;
}

export const GroupContext = createContext<IGroupContext | null>(null);

export const GroupContextProvider = ({ children }: IContextProvider) => {
	const { data: currentUser } = useCurrentUser();
	const {
		data: groups,
		isLoading,
		isError,
		refetch,
		isRefetching,
	} = useUserGroups();

	// const currentGroup: Group | undefined = getCurrentGroup(pathname, groups);
	// const duePayments = currentGroup ? simplifyDebts(currentGroup.members) : [];

	// const transactions = currentGroup
	// ? [...currentGroup?.expenses, ...currentGroup?.payments]
	// : [];

	const value: IGroupContext = {
		currentUser,
		groups: groups ?? [],
		isLoading,
		refetchGroups: refetch,
		isRefetching,
		// users: USERS,
		// addExpense,
		duePayments: [],
	};

	return (
		<GroupContext.Provider value={value}>{children}</GroupContext.Provider>
	);
};

export const useGroupContext = () => {
	const context = useContext(GroupContext);

	if (!context)
		throw new Error(
			"useGroupContext must be used within GroupContextProvider"
		);

	return context;
};
