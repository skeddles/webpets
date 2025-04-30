import { Lessons, id } from '../../database.js';

export async function getLesson (dbId:IdOrString) {
	let lesson = await Lessons.findOne({ _id: id(dbId) });
	if (!lesson) throw new Error("Not Found");
	return lesson as Lesson;
}