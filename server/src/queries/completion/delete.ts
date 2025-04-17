import { Completions, id } from '../../database.js';

export async function deleteCompletion(userId:IdOrString, contentId:string, type:CompletionType) {
	
	const deleteResult = await Completions.deleteOne({
		userId: id(userId),
		contentId: id(contentId),
		type
	});

	if (!deleteResult.acknowledged || deleteResult.deletedCount !== 1) throw new Error("Delete Failed");
	return;
}