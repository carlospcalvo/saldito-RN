import useExpenseStore from "@lib/expense-store";
import { Member, UserID } from "@lib/types";
import { round } from "./number-helpers";

export function initializeParticipants({
	amount,
	userId,
	participants,
}: {
	amount: number;
	userId: string;
	participants: Member[];
}) {
	for (const participant of participants) {
		const value = participant.user_id === userId ? amount : undefined;
		const expenseShare = round(amount / participants.length);

		useExpenseStore.setState((state) => ({
			payers: new Map(state.payers).set(participant.user_id, value),
		}));

		useExpenseStore.setState((state) => ({
			debtors: new Map(state.debtors).set(
				participant.user_id,
				expenseShare
			),
		}));
	}
}

/**
 * Updates the payment/debt share for participants based on their selection and participant type ("payer" or "debtor").
 *
 * @param {boolean} isSelected - Whether the participant is being selected or deselected.
 * @param {UserID} currentParticipantId - The ID of the participant being affected.
 * @param {"payer" | "debtor"} participantType - The type of participant ("payer" or "debtor").
 */
export function handleParticipantSelection(
	isSelected: boolean,
	currentParticipantId: UserID,
	participantType: "payer" | "debtor"
): void {
	const participantGroup: "payers" | "debtors" = `${participantType}s`; // lol
	const totalAmount = useExpenseStore.getState().amount!;
	const participants = useExpenseStore.getState()[participantGroup];
	const activeParticipants = useExpenseStore
		.getState()
		.getActiveParticipants(participantGroup);

	// * Calculate updated share per participant.
	// Add 1 if participant being selected, remove 1 if its being unselected
	const totalParticipants = activeParticipants.length + (isSelected ? 1 : -1);
	const participantShare = round(totalAmount / totalParticipants); // Divide by total participant count

	// Update individual participant share based on selection state
	for (const id of participants.keys()) {
		const isParticipantCurrentlyActive = activeParticipants.includes(id);
		const shouldActivateParticipant =
			isParticipantCurrentlyActive ||
			(isSelected && id === currentParticipantId);
		const shouldDeactivateParticipant =
			!isSelected && id === currentParticipantId;

		useExpenseStore.setState((prev) => ({
			[participantGroup]: prev[participantGroup].set(
				id,
				!shouldDeactivateParticipant && shouldActivateParticipant
					? participantShare
					: undefined
			),
		}));
	}
}

/**
 * Updates the payment share for a specific participant in a specified group (payers or debtors).
 *
 * @param {string} id - The ID of the participant.
 * @param {number} share - The updated payment share for the participant.
 * @param {"payers" | "debtors"} participantGroup - The group the participant belongs to (payers or debtors).
 */
export function updateParticipant(
	id: string,
	share: number,
	participantGroup: "payers" | "debtors"
) {
	// const { [participantGroup]: participantMap } = useExpenseStore.getState();
	const participantMap = useExpenseStore.getState()[participantGroup];
	if (participantMap.has(id)) {
		useExpenseStore.setState((prev) => ({
			[participantGroup]: participantMap.set(id, share),
		}));
	} else {
		console.error(
			`Participant with id ${id} not found in ${participantGroup}`
		);
	}
}

export function handleAmountChange(value: number, currentUserId: UserID) {
	const debtors = useExpenseStore.getState().debtors;
	const activeDebtors = useExpenseStore
		.getState()
		.getActiveParticipants("debtors");
	const activePayers = useExpenseStore
		.getState()
		.getActiveParticipants("payers");

	const expenseShare = round(value / activeDebtors.length);

	if (activePayers.length) {
		useExpenseStore.getState().resetParticipants("payers");
	}
	useExpenseStore.setState((state) => ({
		payers: new Map(state.payers).set(currentUserId, value),
	}));

	for (const debtor of debtors.keys()) {
		useExpenseStore.setState((state) => ({
			debtors: new Map(state.debtors).set(debtor, expenseShare),
		}));
	}

	useExpenseStore.setState(() => ({
		amount: value,
	}));
}
