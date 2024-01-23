import supabase from "@lib/supabase";
import { GroupCategory } from "@lib/types";
import { useMutation } from "@tanstack/react-query";

interface CreateGroupParams {
	name: string;
	category: GroupCategory;
	currency: string;
	image?: File;
}

// TODO: this ↓
const createGroup = async (values: CreateGroupParams) => {
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError) {
		throw userError;
	}

	let imagePath = "";
	if (values.image) {
		const [_, extension] = values.image.name.split(".");
		const { data: fileData, error: fileError } = await supabase.storage
			.from("group_avatars")
			.upload(`${Date.now()}.${extension}`, values.image, {
				cacheControl: "3600",
				upsert: true,
			});

		if (fileError) {
			throw fileError;
		}

		if (fileData) {
			imagePath = fileData.path;
		}
	}
	console.log("(createGroup) user id", user?.id);
	const { data: groupData, error: groupError } = await supabase
		.from("groups")
		.insert({
			...values,
			admin: user?.id,
			simplify_debts: true,
			image: imagePath,
		})
		.select();

	if (groupError) {
		throw groupError;
	}

	return groupData[0];
};

export default function useCreateGroup() {
	return useMutation({
		mutationFn: (values: CreateGroupParams) => createGroup(values),
		retry: 0,
	});
}
