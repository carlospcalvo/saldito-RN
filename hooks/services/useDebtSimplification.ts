import { Balance, Expense, Payment } from "@lib/types";
import { useState } from "react";

interface UseDebtSimplificationProps {
	expenses: Expense[];
	previousBalances?: Balance;
}

const useDebtSimplification = ({
	expenses,
	previousBalances,
}: UseDebtSimplificationProps) => {
	const [balances, setBalances] = useState<Balance>(new Map());
	const [duePayments, setDuePayments] = useState<Payment[]>([]);
	const [total, setTotal] = useState<number>(0);

	// useEffect(() => {
	// 	const instance = new DebtSimplifier(expenses, previousBalances);
	// 	const simplifiedPayments = instance.getDuePayments();

	// 	setDuePayments(simplifiedPayments);
	// 	setBalances(instance.getBalances());
	// 	setTotal(instance.getTotal());
	// }, [expenses, previousBalances]);

	return { balances, duePayments, total };
};

export default useDebtSimplification;
