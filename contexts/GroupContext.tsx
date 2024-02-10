import {
	Expense,
	Group,
	GroupID,
	Member,
	Payment,
	Transactions,
	UserID,
} from "@lib/types";
import React, { createContext, useContext, useMemo } from "react";
import useUserGroups from "@hooks/services/groups/useUserGroups";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import simplifyDebts from "@lib/debt_simplifier";
import { mapTransactions, moveToFront } from "@lib/helpers/array-helpers";
import useCurrentUser from "@hooks/auth/useCurrentUser";

export interface IGroupContext {
	currentGroup: Group | undefined;
	members: Member[];
	groups: Group[] | undefined;
	isLoading: boolean;
	isRefetching: boolean;
	refetchGroups: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<Group[], Error>>;
	duePayments: Partial<Payment>[];
	// addExpense: (newExpense: ExpenseInput) => void;
	expenses: Expense[];
	payments: Payment[];
	transactions: Transactions;
	orderedTxs: (string | Payment | Expense)[];
	getMemberDuePayments: (memberId: UserID) => Partial<Payment>[];
}

export interface IContextProvider {
	children: React.ReactNode;
	id: GroupID;
}

export const GroupContext = createContext<IGroupContext | null>(null);

// TODO: implement with supabase subscription
export const GroupContextProvider = ({ children, id }: IContextProvider) => {
	const {
		data: groups,
		isLoading,
		isError,
		refetch: refetchGroups,
		isRefetching,
	} = useUserGroups();
	const { data: currentUser } = useCurrentUser();

	const currentGroup: Group | undefined = groups?.find(
		(group) => group.id === id
	);

	// Move current user so that it's displayed first on UIs
	const members =
		moveToFront(
			currentGroup?.members ?? [],
			currentUser?.id ?? "",
			"user_id"
		) ?? [];

	// Expenses tab
	const expenses = [...(currentGroup?.expenses ?? [])];
	const payments = [...(currentGroup?.payments ?? [])];

	const transactions = currentGroup ? [...expenses, ...payments] : [];

	const orderedTxs = useMemo(
		() => mapTransactions(transactions),
		[transactions]
	);

	// Balances tab
	const duePayments = simplifyDebts(currentGroup?.members);

	function getMemberDuePayments(memberId: UserID) {
		return duePayments.filter(
			(payment) =>
				payment.from_user === memberId || payment.to_user === memberId
		);
	}

	const value: IGroupContext = {
		currentGroup,
		members,
		groups: groups ?? [],
		isLoading,
		isRefetching,
		refetchGroups,
		// users: USERS,
		// addExpense,
		expenses,
		payments,
		transactions,
		orderedTxs,
		duePayments,
		getMemberDuePayments,
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
