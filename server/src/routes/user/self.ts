import {createRouter} from '../../utilities/create-router.js';
import { getUser } from '../../queries/user/get.js';

export default createRouter({}, async (req, res) => {
	const user = await getUser(req.userId);
	res.status(200).json({ user });
});