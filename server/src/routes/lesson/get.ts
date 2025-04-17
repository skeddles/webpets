import { createRouter, is } from '../../utilities/create-router.js';
import { getLessonBySlug } from '../../queries/lesson/get-by-slug.js';
import { getPresignedUrl } from '../../utilities/storage.js';
import { getCompletionExists } from '../../queries/completion/exists.js';

const schema = {
	slug: is.string().min(4).max(100),
};

export default createRouter(schema, async (req, res) => {
	const { slug } = req.body;
	const lesson = await getLessonBySlug(slug);
	const completed = await getCompletionExists(req.userId, lesson._id, 'lesson');
	const url = await getPresignedUrl(`lessonz/${lesson.pageId}/${lesson.pageId}.htm`);
	res.status(200).json({ lesson, url, completed });
});