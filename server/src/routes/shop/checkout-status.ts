import {createRouter, is} from '../../utilities/create-router.js';
import { stripe } from '../../utilities/stripe.js';

const schema = {
	sessionId: is.string(),
};

export default createRouter(schema, async (req, res) => {
	const { sessionId } = req.body;
	
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	if (!session) throw 'Not found';

	const result = {
		status: session.status,
		customer_email: session.customer_details?.email,
	};

	console.log('Checkout session:', session);

	res.status(200).json(result);
});
