import {Assignments} from '../../database.js';

type AssignmentInsert = Omit<Assignment, '_id' | 'notionId'>;

export async function upsertAssignment(notionId:string, lesson:string, name:string, number:number, optional:boolean, repeatable:boolean) {
	const assignmentInsert:AssignmentInsert = {
		name,
		lesson,
		number,
		optional,
		repeatable,
	};
	const insertResult = await Assignments.updateOne({notionId}, {$set: assignmentInsert}, {upsert:true});
	if (!insertResult.acknowledged) throw new Error("Insert Failed");
	const assignment = {
		_id: insertResult.upsertedId,
		notionId,
		...assignmentInsert
	};
	return assignment as Assignment;
}