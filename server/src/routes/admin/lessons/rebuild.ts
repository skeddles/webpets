import { createRouter, is } from '../../../utilities/create-router.js';
import notion from '../../../utilities/notion.js';
import * as storage from '../../../utilities/storage.js';
import { getLessonBySlug } from '../../../queries/lesson/get-by-slug.js';
import downloadAllFiles from '../../../utilities/download-all-files.js';
import updateAssignments from '../../../utilities/update-assignments.js';

const schema = {
	slug: is.string().min(4).max(100),
};

export default createRouter(schema, async (req, res) => {
	const { slug } = req.body;
	const lesson = await getLessonBySlug(slug);
	const {files, html} = await notion.getPageHtml(lesson.pageId);

	await updateAssignments(lesson.title);

	await storage.uploadFile(`lessonz/${lesson.pageId}/${lesson.pageId}.htm`, html, false);
	await downloadAllFiles('lessons/'+lesson.pageId, files);
	res.status(200).json({ message: 'lesson rebuilt' });
});