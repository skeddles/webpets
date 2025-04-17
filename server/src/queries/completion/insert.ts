import {Completions} from '../../database.js';

type CompletionInsert = Omit<Completion, '_id'>;

export async function insertCompletion(userId:IdOrString, contentId:string, type:CompletionType) {
	const completionInsert:CompletionInsert = {
		userId,
		contentId,
		type
	};
	const insertResult = await Completions.insertOne(completionInsert);
	if (!insertResult.acknowledged) throw new Error("Insert Failed");
	const completion = {
		_id: insertResult.insertedId,
		...completionInsert
	};
	return completion as Completion;
}