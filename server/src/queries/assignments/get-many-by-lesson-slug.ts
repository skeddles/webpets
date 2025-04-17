import { Assignments } from '../../database.js';

export async function getAssignmentsByLessonSlug (lessonSlug:string) {
	let assignments = await Assignments.find({lessonSlug}).sort({ number: 1 }).toArray();
	if (!assignments) throw new Error("Not Found");
	return assignments as Assignment[];
}