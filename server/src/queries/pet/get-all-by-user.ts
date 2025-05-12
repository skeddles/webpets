import { Pets, id } from "../../database";

export async function getAllPetsByUserId(userId: IdOrString) {
	const pets = await Pets.find({ userId: id(userId) }).toArray();
	if (!pets) throw new Error("Not Found");
	return pets;
}