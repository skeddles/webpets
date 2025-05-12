import { Pets } from "../../database.js";

export async function getPetBySlug(slug: string) {
	const pet = await Pets.findOne({ slug });
	if (!pet) throw new Error("Pet not found");
	return pet;
}
