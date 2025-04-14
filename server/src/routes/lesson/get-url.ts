import { createRouter, is } from '../../utilities/create-router.js';
import { getPresignedUrl } from '../../utilities/storage.js';

const schema = {
	pageId: is.string(),
};

export default createRouter(schema, async (req, res) => {
	const { pageId } = req.body;
	const url = await getPresignedUrl(`lessonz/${pageId}/${pageId}.htm`);
	res.status(200).json({ url });
});