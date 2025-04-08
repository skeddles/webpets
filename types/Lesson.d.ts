type Lesson = {
	_id: ObjectId;
	title: string;
	description: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	number: number;
	pageId: string;
	slug: string;
}

type LessonClient = Omit<Lesson, '_id'> & {
	url: string;
	course: string;
}