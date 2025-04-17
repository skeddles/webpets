import { Completions, id } from '../../database.js';

type CompletionMatch = Omit<Completion, '_id'>;

export async function getCompletionExists(userId:IdOrString, contentId:IdOrString, type:CompletionType) {
	const completionMatch:CompletionMatch = {
		userId: id(userId),
		contentId: id(contentId),
		type
	};

	const completion = await Completions.findOne(completionMatch);
	return completion ? true : false;
}