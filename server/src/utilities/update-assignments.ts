import { PartialDatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getAssignments } from "./notion";
import { upsertAssignment } from "../queries/assignments/upsert";
import downloadAllFiles from "./download-all-files";
import { z } from 'zod';
import notion from "./notion";


type NotionAssignmentsDatabaseObject = PartialDatabaseObjectResponse & {
	id: string;
	properties: {
		Name: { title: { text: { content: string } }[] };
		Number: { number: number };
		Optional: { checkbox: boolean };
		Repeatable: { checkbox: boolean };
		LessonSlug: { select: { name: string }};
		Worksheet: { files: { file: { url: string }, name: string }[] };
	};
}

const assignmentSchema = z.object({
	name: z.string().min(3).max(38),
	number: z.number().min(1).max(10),
	optional: z.boolean(),
	repeatable: z.boolean(),
	lessonSlug: z.string().regex(/^[a-z0-9-]+$/),
	worksheet: z.string(),
	worksheetExtension: z.literal('png'),
	html: z.string().min(20),
	files: z.array(z.object({
		id: z.string(),
		url: z.string().url()
	}))
});

export default async function updateAssignments(slug:string|null = null) {
	const assignments = await getAssignments();

	const images = [];

	console.log('assignments', assignments);

	if (slug) console.log('updating assignments for /lesson/'+slug);
	else console.log('updating all assignments');

	for (const assignment of assignments as NotionAssignmentsDatabaseObject[]) {
		if (slug && assignment.properties.LessonSlug.select?.name !== slug) continue;

		try {
			const notionId = assignment.id;
			const name = assignment.properties.Name.title[0]?.text.content || 'No Name';
			const number = assignment.properties.Number.number;
			const optional = assignment.properties.Optional.checkbox || false;
			const repeatable = assignment.properties.Repeatable.checkbox || false;
			const lessonSlug = assignment.properties.LessonSlug.select?.name;
			const worksheet = assignment.properties.Worksheet.files[0]?.file.url;
			const worksheetExtension = getFileExtension(assignment.properties.Worksheet.files[0]?.name);
			const {html, files} = await notion.getPageHtml(notionId);

			console.log('assignment', assignment.id, name, html);

			assignmentSchema.parse({name, number, optional, repeatable, lessonSlug, worksheet, worksheetExtension, html, files});

			await upsertAssignment(notionId, lessonSlug, name, number, optional, repeatable, html);
			images.push({url:worksheet, id:`${notionId}.${worksheetExtension}`});
			images.push(...files);
			console.log('assignment upserted:', assignment.id);
		} catch (error) {
			console.error('Failed to upsert assignment',assignment.id, error);
		}
	}

	await downloadAllFiles(`assignments`, images);
}

function getFileExtension(path:string) {
	const parts = path.split('.');
	return parts[parts.length - 1];
}