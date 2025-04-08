import { createRouter, is } from '../../utilities/create-router.js';
import { getLessonBySlug } from '../../queries/lesson/get-by-slug.js';
import { getPresignedUrl } from '../../utilities/storage.js';

const schema = {
	slug: is.string().min(4).max(100),
};

export default createRouter(schema, async (req, res) => {
	const { slug } = req.body;
	const lessonData = await getLessonBySlug(slug);
	const url = await getPresignedUrl(`lessonz/${lessonData.pageId}/${lessonData.pageId}.htm`);
	const lesson:LessonClient = {
		number: lessonData.number,
		title: lessonData.title,
		description: lessonData.description,
		level: lessonData.level,
		slug: lessonData.slug,
		pageId: lessonData.pageId,
		url: url + '&t=' + Date.now(),
	};
	res.status(200).json({ lesson: lesson as LessonClient });
});