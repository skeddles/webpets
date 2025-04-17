import { createRouter, is } from '../../utilities/create-router.js';
import { getAssignmentsByLessonSlug } from '../../queries/assignments/get-many-by-lesson-slug.js';

const schema = {
	slug: is.string().min(4).max(100),
};

export default createRouter(schema, async (req, res) => {
	const { slug } = req.body;
	const assignments = await getAssignmentsByLessonSlug(slug);
	res.status(200).json({ assignments });
});