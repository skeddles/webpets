import { PartialDatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getAssignments } from "./notion";
import { upsertAssignment } from "../queries/assignments/upsert";
import downloadAllFiles from "./download-all-files";

type NotionAssignmentsDatabaseObject = PartialDatabaseObjectResponse & {
	id: string;
	properties: {
		Name: { title: { text: { content: string } }[] };
		Number: { number: number };
		Optional: { checkbox: boolean };
		Repeatable: { checkbox: boolean };
		Lesson: { select: { name: string } | null };
		Worksheet: { files: { file: { url: string }, name: string }[] };
	};
}

export default async function updateAssignments(lessonName:string|null = null) {
	const assignments = await getAssignments();

	console.log('Assignments:', assignments);


	for (const assignment of assignments as NotionAssignmentsDatabaseObject[]) {
		if (lessonName && assignment.properties.Lesson.select?.name !== lessonName) continue;

		try {
			const notionId = assignment.id;
			const name = assignment.properties.Name.title[0]?.text.content || 'No Name';
			const number = assignment.properties.Number.number;
			const optional = assignment.properties.Optional.checkbox || false;
			const repeatable = assignment.properties.Repeatable.checkbox || false;
			const lesson = assignment.properties.Lesson.select?.name || 'No Lesson';
			const worksheet = assignment.properties.Worksheet.files[0]?.file.url;
			const worksheetExtension = getFileExtension(assignment.properties.Worksheet.files[0]?.name);

			await upsertAssignment(notionId, lesson, name, number, optional, repeatable);
			await downloadAllFiles(`assignments`, [{url:worksheet, id:`${notionId}.${worksheetExtension}`}]);
			console.log('assignment upserted:', assignment.id);
		} catch (error) {
			console.error('Failed to upsert assignment',assignment.id, error);
		}
	}
}

function getFileExtension(path:string) {
	const parts = path.split('.');
	return parts[parts.length - 1];
}