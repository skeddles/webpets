import {Completions} from '../../database.js';

export async function deleteCompletion(userId:IdOrString, contentId:string, type:CompletionType) {
	
	const deleteResult = await Completions.deleteOne({
		userId,
		contentId,
		type
	});

	if (!deleteResult.acknowledged) throw new Error("Delete Failed");
	return;
}