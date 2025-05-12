import {createRouter} from '../../utilities/create-router.js';
import { getUser } from '../../queries/user/get.js';
import { getAllPetsByUserId } from '../../queries/pet/get-all-by-user.js';

export default createRouter({}, async (req, res) => {
	const user = await getUser(req.userId);

	const pets = await getAllPetsByUserId(req.userId);

	res.status(200).json({ user, pets });
});