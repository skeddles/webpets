import { Completions, id } from '../../database.js';

type CompletionMatch = Omit<Completion, '_id' | 'contentId'>;

export async function getManyCompletions(userId:IdOrString, type:CompletionType) {
	const completionMatch:CompletionMatch = {
		userId: id(userId),
		type
	};

	const completion = await Completions.find(completionMatch).toArray();

	return completion as Completion[];
}