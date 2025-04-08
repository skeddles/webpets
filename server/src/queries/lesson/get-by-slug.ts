import { Lessons } from '../../database.js';

export async function getLessonBySlug (slug:string) {
	let lesson = await Lessons.findOne({ slug });
	if (!lesson) throw new Error("Not Found");
	return lesson as Lesson;
}