import {Lessons} from '../../database.js';

type LessonInsert = Omit<Lesson, '_id'>;

export async function insertLesson( pageId:string, title:string, slug:string, description:string, level:'beginner' | 'intermediate' | 'advanced', number:number,course:string, priceId:string) {
	const lessonInsert:LessonInsert = {
		pageId,
		title,
		slug,
		description,
		level,
		number,
		course,
		priceId,
	};
	const insertResult = await Lessons.insertOne(lessonInsert);
	if (!insertResult.acknowledged) throw new Error("Insert Failed");
	const insertedLesson = {
		_id: insertResult.insertedId,
		...lessonInsert
	};
	return insertedLesson as Lesson;
}