import { createRouter, is } from '../../utilities/create-router.js';
import { getPetBySlug } from '../../queries/pet/get-by-slug.js';

const schema = {
	slug: is.string().min(1),
};

export default createRouter(schema, async (req, res) => {
	const { slug } = req.body;
	const pet = await getPetBySlug(slug);
	res.json({pet});
});
