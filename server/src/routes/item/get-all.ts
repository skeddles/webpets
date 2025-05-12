import {createRouter} from '../../utilities/create-router.js';
import { getAllItemsByUserId } from '../../queries/item/get-all-by-user.js';

export default createRouter({}, async (req, res) => {
	const items = await getAllItemsByUserId(req.userId);
	res.status(200).json({ items });
});