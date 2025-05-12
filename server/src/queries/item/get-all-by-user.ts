import { Items, id } from "../../database";

export async function getAllItemsByUserId(userId: IdOrString) {
	const items = await Items.find({ userId: id(userId) }).toArray();
	if (!items) throw new Error("Not Found");
	return items;
}