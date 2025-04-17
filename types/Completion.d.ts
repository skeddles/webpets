

type CompletionType = 'lesson' | 'assignment';

type Completion = {
	_id: IdOrString;
	userId: IdOrString;
	contentId: IdOrString;
	type: CompletionType;
}