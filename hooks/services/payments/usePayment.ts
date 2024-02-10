import { useQuery } from "@tanstack/react-query";
// import { SUPABASE_URL } from "@constants/Api";
import supabase from "@lib/supabase";
import { PaymentDetail } from "@lib/types";

const getPayment = async (id: string): Promise<PaymentDetail> => {
	const { data, error } = await supabase
		.from("payments")
		.select(
			`*,
			created_by(
				id,
				name
			), 
			from_user(
				id,
				avatar, 
				name
			),
			to_user(
				id,
				avatar, 
				name
			)`
		)
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching payment details", error.message);
		throw error;
	}

	return data;
};

/**
 * Hook that queries a payment.
 * @param id Payment ID.
 * @returns A payment.
 */
export default function usePayment(id: string) {
	return useQuery({
		queryKey: ["payment"],
		queryFn: () => getPayment(id),
		retry: 5,
	});
}
