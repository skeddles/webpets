type Lesson = {
	_id: ObjectId | string;
	title: string;
	description: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	number: number;
	pageId: string;
	slug: string;
	course: string;
	priceId: string;
}