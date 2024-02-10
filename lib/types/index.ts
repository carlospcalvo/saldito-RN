export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type UserID = string;
export type GroupID = string;

export type User = {
	id: UserID;
	name: string;
	email?: string;
	image?: string;
	bankAccounts?: [];
	groups?: GroupID[];
};

export type Bank = {
	id: string;
	name: string;
	logo?: string;
};

export type BankAccount = {
	id: string;
	bank: Bank;
	transfer_number?: number; // CBU/CVU
	transfer_alias?: string; // alias
};

export enum GroupCategory {
	FRIENDS = "friends",
	FAMILY = "family",
	TRAVEL = "travel",
	WORK = "work",
}

// export type Group = {
// 	id: GroupID;
// 	created_at: string;
// 	name: string;
// 	category: GroupCategory;
// 	users: User[];
// 	transactions: Transactions;
// 	image?: string;
// 	currency?: string; // Default ARS
// };

export type Profile = {
	avatar: string;
	name: string;
};

export type Member = {
	is_admin: boolean;
	user_id: UserID;
	balance: number;
	profile: Profile;
};

export type Expense = Transaction & {
	amount: number;
	group_id: GroupID;
	description: string;
	expense_participants: ExpenseParticipant[];
};

export type ExpenseDetailParticipant = {
	id: string;
	expense_id: string;
	name: string;
	avatar: string;
	credit: number | undefined;
	debt: number | undefined;
};

export type PaymentDetail = {
	id: string;
	group_id: string;
	amount: number;
	created_at: string;
	currency: string;
	date: string;
	created_by: {
		id: string;
		name: string;
	};
	from_user: {
		id: string;
		avatar: string;
		name: string;
	};
	to_user: {
		id: string;
		avatar: string;
		name: string;
	};
};

export type ExpenseParticipant = {
	amount: number;
	user_id: UserID;
	created_at: string;
	expense_id: string;
	participated_as: string;
};

export type Group = {
	id: string;
	name: string;
	category: GroupCategory;
	image: string;
	simplifyDebts: boolean;
	userBalance: number;
	members: Member[];
	expenses: Expense[];
	payments: Payment[];
};

export enum TransactionType {
	PAYMENT = "payment",
	EXPENSE = "expense",
}

export interface Transaction {
	id: string;
	created_at: string;
	created_by: UserID;
	date: string;
	type?: TransactionType;
}

export type Transactions = (Expense | Payment)[];

// Expense: Represents an expense with amount, payer, and debtors.
// export type Expense = Transaction & {
// 	date: string;
// 	amount: number;
// 	description: string;
// 	payers: Map<UserID, number>;
// 	debtors: Map<UserID, number>;
// };

export type Payment = Transaction & {
	amount: number;
	from_user: UserID;
	to_user: UserID;
};

// Balance: Represents a user's balance (amount owed or owned).
export type Balance = Map<number, number>;

// Type Guard functions

export function isTransaction(item: any): item is Transaction {
	return (
		typeof item === "object" &&
		item !== null &&
		"id" in item &&
		typeof item.id === "string" &&
		"created_at" in item &&
		typeof item.created_at === "string" &&
		"date" in item &&
		typeof item.date === "string"
	);
}

export function isExpense(item: any): item is Expense {
	return (
		typeof item === "object" &&
		item !== null &&
		"amount" in item &&
		typeof item.amount === "number" &&
		"group_id" in item &&
		typeof item.group_id === "string" &&
		"description" in item &&
		typeof item.description === "string" &&
		"expense_participants" in item &&
		Array.isArray(item.expense_participants)
	);
}

export function isExpenseDetailParticipant(
	item: any
): item is ExpenseDetailParticipant {
	return (
		typeof item === "object" &&
		item !== null &&
		"id" in item &&
		typeof item.id === "string" &&
		"name" in item &&
		typeof item.name === "string" &&
		"avatar" in item &&
		typeof item.avatar === "string" &&
		"credit" in item &&
		"debt" in item
	);
}

export function isMember(value: any): value is Member {
	return (
		typeof value === "object" &&
		value !== null &&
		"is_admin" in value &&
		typeof value.is_admin === "boolean" &&
		"user_id" in value &&
		typeof value.user_id === "string" &&
		"balance" in value &&
		typeof value.balance === "number" &&
		"profile" in value &&
		isProfile(value.profile)
	);
}

export function isProfile(value: any): value is Profile {
	return (
		typeof value === "object" &&
		value !== null &&
		"avatar" in value &&
		typeof value.avatar === "string" &&
		"name" in value &&
		typeof value.name === "string"
	);
}
