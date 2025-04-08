import { createRouter } from '../../../utilities/create-router.js';
import { getAllLessons } from '../../../queries/lesson/get-all.js';
import * as notion from '../../../utilities/notion.js';
import * as storage from '../../../utilities/storage.js';

export default createRouter({}, async (req, res) => {

	const lessons = await getAllLessons();

	const lessonPages = await notion.getLessonList();

	const lessonsThatNeedRebuild = findOutdatedLessons(lessons, lessonPages);

	console.log('lessons:', {
		lessons,
		lessonPages: lessonPages.length,
		lessonsThatNeedRebuild,
	});

	for (const lesson of lessonsThatNeedRebuild) {
		const {files, html} = await notion.getLessonHtml(lesson.pageId);
		await storage.uploadFile(`lessonz/${lesson.pageId}/${lesson.pageId}.htm`, html, false);
		await downloadAllFiles(lesson.pageId, files);
	}

	res.status(200).json({ message: 'lessons rebuilt' });
});


function findOutdatedLessons(lessons:Lesson[], lessonPages) {
	const lessonsThatNeedRebuild = [];

	for (const lesson of lessons) {
		const lessonPage = lessonPages.find((lessonPage) => lessonPage.id === lesson.pageId);
		if (lessonPage)
			lessonsThatNeedRebuild.push(lesson);
		else
			console.warn('Lesson not found in Notion:', lesson._id, lesson.title, lesson.pageId);
	}

	return lessonsThatNeedRebuild;
}


async function downloadAllFiles(folderPath:string, files:BlockFileData[]) {
	for (const file of files) {
		try {
			//download the files data from the url
			const response = await fetch(file.url);
			if (!response.ok) throw new Error('Failed to download file: ' + response.statusText);
			const fileData = Buffer.from(await response.arrayBuffer());
			await storage.uploadFile(`lessons/${folderPath}/${file.id}`, fileData, true);
			console.log('File downloaded and uploaded:', file.id);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	}
}