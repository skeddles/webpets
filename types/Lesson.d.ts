type Lesson = {
	_id: string;
	title: string;
	description: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	number: number;
	pageId: string;
}