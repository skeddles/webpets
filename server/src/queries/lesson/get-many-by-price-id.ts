import { Lessons } from '../../database.js';

export async function getLessonsByPriceId (priceIds: string[]) {
	let lessons = await Lessons.find({ priceId: { $in: priceIds } }).toArray();
	if (!lessons) throw new Error("Not Found");
	return lessons as Lesson[];
}