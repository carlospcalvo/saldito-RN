import { format as formatDate } from "date-fns";
import { create } from "zustand";
import { ExpenseParticipant, UserID } from "./types";

// type Participant = {
// 	id: string;
// 	amount: number;
// 	isActive?: boolean;
// };

type State = {
	date: string;
	type: string;
	amount: string | undefined;
	description: string;
	expense_participants: Partial<ExpenseParticipant>[];
	created_by: UserID | undefined;
	group_id: string | undefined;
	payers: Map<string, string | undefined>;
	debtors: Map<string, string | undefined>;
};

type Actions = {
	setDate: (date: Date) => void;
	setDescription: (description: string) => void;
	setAmount: (amount: string) => void;
	setCreatedBy: (userId: UserID | undefined) => void;
	setGroupId: (groupId: string | undefined) => void;
	setPayer: (id: UserID, amount: string) => void;
	setDebtor: (id: UserID, amount: string) => void;
};

type Helpers = {
	getActiveParticipants: (group: "payers" | "debtors") => string[];
	resetParticipants: (group?: "payers" | "debtors" | "all") => void;
};

const useExpenseStore = create<State & Actions & Helpers>((set, get) => ({
	// * State
	date: formatDate(new Date(), "yyyy-MM-dd"),
	type: "expense", // ? maybe we can remove this and handle it on db
	amount: undefined,
	description: "",
	expense_participants: [],
	created_by: undefined,
	group_id: undefined,
	payers: new Map(),
	debtors: new Map(),

	// * Actions
	setDate: (date: Date) =>
		set(() => ({ date: formatDate(date, "yyyy-MM-dd") })),
	setDescription: (description: string) => set(() => ({ description })),
	setAmount: (amount: string) => set(() => ({ amount })),
	setCreatedBy: (userId: UserID | undefined) =>
		set(() => ({ created_by: userId })),
	setGroupId: (groupId: string | undefined) =>
		set(() => ({ group_id: groupId })),
	setPayer: (id: UserID, amount: string) =>
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

	// * Helpers
	getActiveParticipants: (group: "payers" | "debtors") =>
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
