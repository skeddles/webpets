import {Users, id} from '../../database.js';

export async function getUser(userId:ObjectId) {
	const user = await Users.findOne({ _id: id(userId) });
	if (!user) throw new Error('Not Found');
	return user as User;
}