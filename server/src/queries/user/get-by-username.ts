import {Users} from '../../database.js';

export async function getUserByUsername(username:string) {
	const user = await Users.findOne({ username }, {collation: {locale: 'en', strength: 2}});
	if (!user) throw new Error('Not Found');
	return user as User;
}