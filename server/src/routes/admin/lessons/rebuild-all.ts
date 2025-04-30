import { createRouter } from '../../../utilities/create-router.js';
import { getAllLessons } from '../../../queries/lesson/get-all.js';
import {insertLesson} from '../../../queries/lesson/insert.js';
import notion from '../../../utilities/notion.js';
import * as storage from '../../../utilities/storage.js';
import downloadAllFiles from '../../../utilities/download-all-files.js';
import updateAssignments from '../../../utilities/update-assignments.js';
import type { NotionLessonPage } from '../../../types/NotionLessonPage.js';
import slugify from '../../../utilities/slugify.js';
import { createProduct } from '../../../utilities/stripe/create-product.js';

export default createRouter({}, async (_req, res) => {
	const START = performance.now();

	const lessons = await getAllLessons();
	const lessonPages = await notion.getLessonList();
	const lessonsThatNeedRebuild = findOutdatedLessons(lessons, lessonPages);
	const lessonsThatDontExistInDatabase = findUnsyncedLessons(lessons, lessonPages);

	console.log('lessons:', {
		lessonPages: lessonPages.length,
		lessonsThatNeedRebuild: lessonsThatNeedRebuild.map((lesson:Lesson) => lesson.title),
		lessonsThatDontExistInDatabase: lessonsThatDontExistInDatabase.map((lesson:NotionLessonPage) => lesson.properties.Name.title[0].plain_text),
	});

	const newLessons = await createDocumentsForLessonsThatDontExistYet(lessonsThatDontExistInDatabase);
		lessonsThatNeedRebuild.push(...newLessons);

	await rebuildLessons(lessonsThatNeedRebuild);
	await updateAssignments();

	const MS_TAKEN = Math.round(performance.now() - START);
	res.status(200).json({ message: lessonsThatNeedRebuild.length+' lessons rebuilt in ' + MS_TAKEN + 'ms' });
});

async function rebuildLessons(lessons:Lesson[]) {
	for (const lesson of lessons) {
		const {files, html} = await notion.getPageHtml(lesson.pageId, 'lessons');
		await storage.uploadFile(`lessonz/${lesson.pageId}/${lesson.pageId}.htm`, html, false);
		await downloadAllFiles('lessons/'+lesson.pageId, files);
	}
}

async function createDocumentsForLessonsThatDontExistYet(lessonPages:NotionLessonPage[]) {
	const newLessons = [];

	for (const lesson of lessonPages) {

		const lessonTitle = lesson.properties.Name.title[0].plain_text;
		const lessonDescription = lesson.properties.Description.rich_text[0].plain_text;
		const lessonProduct = await createProduct(lessonTitle, 'Lesson: '+lessonDescription, 'lesson');

		const newLesson = await insertLesson(
			lesson.id,
			lessonTitle,
			slugify(lessonTitle),
			lessonDescription,
			lesson.properties.Level.select?.name as 'beginner' | 'intermediate' | 'advanced',
			0,
			lesson.properties.Course.select?.name as string,
			lessonProduct.price.id,
		);

		console.log('Created new database record for lesson:', newLesson._id, newLesson.title, newLesson.pageId);

		newLessons.push(newLesson);
	}

	return newLessons;
}

function findUnsyncedLessons(lessons:Lesson[], lessonPages:NotionLessonPage[]) {
	const lessonsThatDontExistInDatabase = [];

	for (const lessonPage of lessonPages) {
		const lesson = lessons.find((lesson:Lesson) => lesson.pageId === lessonPage.id);
		if (!lesson) {
			lessonsThatDontExistInDatabase.push(lessonPage);
			console.warn('Lesson not found in database:', lessonPage.id);
		}
	}

	return lessonsThatDontExistInDatabase;
}


function findOutdatedLessons(lessons:Lesson[], lessonPages:any) {
	const lessonsThatNeedRebuild = [];

	for (const lesson of lessons) {
		const lessonPage = lessonPages.find((lessonPage:any) => lessonPage.id === lesson.pageId);
		if (lessonPage)
			lessonsThatNeedRebuild.push(lesson);
		else
			console.warn('Lesson not found in Notion:', lesson._id, lesson.title, lesson.pageId);
	}

	return lessonsThatNeedRebuild;
}
