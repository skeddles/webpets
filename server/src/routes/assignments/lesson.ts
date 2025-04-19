import { createRouter, is } from '../../utilities/create-router.js';
import { getAssignmentsByLessonSlug } from '../../queries/assignments/get-many-by-lesson-slug.js';
import { getManyCompletions } from '../../queries/completion/get-many.js';
const schema = {
	slug: is.string().min(4).max(100),
};

export default createRouter(schema, async (req, res) => {
	const { slug } = req.body;
	const assignments = await getAssignmentsByLessonSlug(slug);
	const allCompletedAssignments = await getManyCompletions(req.userId, 'assignment');

	const completedAssignments:string[] = getListOfCompletedAssignments(allCompletedAssignments, assignments);
	
	res.status(200).json({ assignments, completedAssignments });
});


function getListOfCompletedAssignments(allCompletedAssignments:Completion[], assignments:Assignment[]) {
	const completedAssignments:string[] = [];

	if (!assignments || !allCompletedAssignments) return completedAssignments;

	for (const assignmentCompletion of allCompletedAssignments) {
		const assignmentIsInThisLesson = assignments.find((a) => a._id.toString() === assignmentCompletion.contentId.toString());
		if (assignmentIsInThisLesson) 
			completedAssignments.push(assignmentCompletion.contentId.toString());
	}

	return completedAssignments;
}