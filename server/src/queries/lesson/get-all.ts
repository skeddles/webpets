import { Lessons } from '../../database.js';

export async function getAllLessons() {
	const lessons = await Lessons.find().toArray();
	if (!lessons) throw new Error('Not Found');
	return lessons as Lesson[];
}