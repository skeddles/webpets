

type CompletionType = 'lesson' | 'assignment';

type Completion = {
	_id: IdOrString;
	userId: IdOrString;
	contentId: string;
	type: CompletionType;
}