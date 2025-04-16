import {Users} from '../../database.js';

type UserInsert = Omit<User, '_id'>;

export async function insertUser(username:string, password:string) {
	const userInsert:UserInsert = {
		username,
		password,
		admin: false,
		purchasedLessons: [],
		purchasedCourses: []
	};
	const insertResult = await Users.insertOne(userInsert);
	if (!insertResult.acknowledged) throw new Error("Insert Failed");
	const user = {
		_id: insertResult.insertedId,
		...userInsert
	};
	return user as User;
}