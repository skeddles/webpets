import { Users, id } from '../../database.js';


export async function addUserPurchases (userId:IdOrString, lessonPriceIds:IdOrString[]) {

	console.log("Adding purchases for user", userId, lessonPriceIds);

	const userMatch = { _id: id(userId) };
	const userSet =  { $addToSet: { 
		purchasedLessons: { $each: lessonPriceIds.map(i=> id(i)) }, 
	}};

	const result = await Users.updateOne(userMatch, userSet);
	if (result.modifiedCount === 0) 
		throw new Error(`Failed to add purchases for user with id ${userId}`);
	
	return;
}
