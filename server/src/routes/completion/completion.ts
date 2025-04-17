import { createRouter, is } from '../../utilities/create-router';
import { insertCompletion } from '../../queries/completion/insert';
import { deleteCompletion } from '../../queries/completion/delete';

const schema = {
	complete: is.boolean(),
	contentId: is.string(),
	type: is.enum(['lesson', 'assignment'])
};

export default createRouter(schema, async (req, res) => {
	const { complete, contentId, type } = req.body;

	if (complete) await insertCompletion(req.userId, contentId, type );
	else await deleteCompletion(req.userId, contentId, type );
	
	res.status(200).json({ });
});