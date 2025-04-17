type Assignment = {
	_id: ObjectId | string;
	notionId: string;
	name: string;
	lessonSlug: string;
	number: number;
	optional: boolean;
	repeatable: boolean;
	description: string;
}
