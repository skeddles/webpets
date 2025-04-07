import { createRouter } from '../../../utilities/create-router.js';
import { getAllLessons } from '../../../queries/lesson/get-all.js';

export default createRouter({}, async (req, res) => {

	const lessons = await getAllLessons();

	console.log('lessons:', lessons);


	res.status(200).json({ message: 'lessons rebuilt' });
});