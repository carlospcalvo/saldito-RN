import { format as formatDate } from "date-fns";
import { create } from "zustand";
import { ExpenseParticipant, GroupID, UserID } from "./types";

// type Participant = {
// 	id: string;
// 	amount: number;
// 	isActive?: boolean;
// };

type State = {
	date: string;
	type: string;
	amount: number | undefined;
	currency: string;
	description: string;
	expense_participants: Partial<ExpenseParticipant>[];
	created_by: UserID | undefined;
	group_id: string | undefined;
	payers: Map<UserID, number | undefined>;
	debtors: Map<UserID, number | undefined>;
	category: string | undefined;
};

type Actions = {
	setDate: (date: Date) => void;
	setDescription: (description: string) => void;
	setAmount: (amount: number) => void;
	setCreatedBy: (userId: UserID | undefined) => void;
	setGroupId: (groupId: GroupID | undefined) => void;
	setPayer: (id: UserID, amount: number) => void;
	setDebtor: (id: UserID, amount: number) => void;
	setCategory: (categoryId: string) => void;
	setCurrency: (code: string) => void;
};

type Helpers = {
	reset: () => void;
	getActiveParticipants: (group: "payers" | "debtors") => string[];
	resetParticipants: (group?: "payers" | "debtors" | "all") => void;
};

const initialState: State = {
	date: formatDate(new Date(), "yyyy-MM-dd"),
	type: "expense", // ? maybe we can remove this and handle it on db
	amount: 0,
	currency: "ARS",
	description: "",
	expense_participants: [],
	created_by: undefined,
	group_id: undefined,
	payers: new Map(),
	debtors: new Map(),
	category: undefined,
};

const useExpenseStore = create<State & Actions & Helpers>((set, get) => ({
	// * State
	...initialState,

	// * Actions
	setDate: (date: Date) =>
		set(() => ({ date: formatDate(date, "yyyy-MM-dd") })),
	setDescription: (description: string) => set(() => ({ description })),
	setAmount: (amount) => set(() => ({ amount })),
	setCreatedBy: (userId) => set(() => ({ created_by: userId })),
	setGroupId: (groupId) => set(() => ({ group_id: groupId })),
	setPayer: (id, amount) =>
		set((state) => {
			const updatedPayers = new Map(state.payers);
			updatedPayers.set(id, amount);
			return { payers: updatedPayers };
		}),
	setDebtor: (id, amount) =>
		set((state) => {
			const updatedDebtors = new Map(state.payers);
			updatedDebtors.set(id, amount);
			return { payers: updatedDebtors };
		}),
	setCategory: (categoryId) => set(() => ({ category: categoryId })),
	setCurrency: (code) => set(() => ({ currency: code })),

	// * Helpers
	reset: () => {
		set(initialState);
	},
	getActiveParticipants: (group) =>
		Array.from(get()[group])
			.filter(([_, amount]) => amount)
			?.map(([id]) => id) as UserID[],
	resetParticipants: (group = "all") =>
		set((state) => {
			const updatedPayers = new Map(state.payers);
			const updatedDebtors = new Map(state.debtors);

			for (const payer of state.payers.keys()) {
				updatedPayers.set(payer, undefined);
				updatedDebtors.set(payer, undefined);
			}

			if (group === "payers") {
				return { payers: updatedPayers, debtors: state.debtors };
			}

			if (group === "debtors") {
				return { payers: state.payers, debtors: updatedDebtors };
			}

			return { payers: updatedPayers, debtors: updatedDebtors };
		}),
}));

export default useExpenseStore;
