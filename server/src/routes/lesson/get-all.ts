import { createRouter, is } from '../../utilities/create-router.js';
import { getAllLessons } from '../../queries/lesson/get-all.js';

export default createRouter({}, async (req, res) => {

	const lessons = await getAllLessons();

	res.status(200).json({ lessons });
});