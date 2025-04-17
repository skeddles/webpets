import { createRouter, is } from '../../utilities/create-router.js';
import { getAllLessons } from '../../queries/lesson/get-all.js';
import { getManyCompletions } from '../../queries/completion/get-many.js';

export default createRouter({}, async (req, res) => {
	const lessons = await getAllLessons();
	const completedLessons = (await getManyCompletions(req.userId, 'lesson')).map(c=> c.contentId);
	res.status(200).json({ lessons, completedLessons });
});