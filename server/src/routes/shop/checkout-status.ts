import {createRouter, is} from '../../utilities/create-router.js';
import {getLessonsFromLineItems} from '../../utilities/stripe/line-item-lookup.js';
import { getExpandedCheckoutSession } from '../../utilities/stripe/get-expanded-checkout.js';

const schema = {
	sessionId: is.string(),
};

export default createRouter(schema, async (req, res) => {
	const { sessionId } = req.body;
	
	const session = await getExpandedCheckoutSession(sessionId);
	if (!session) throw 'Not found';


	const status = session.status;
	const paymentStatus = session.payment_status;

	let purchasedLessons:Lesson[] = [];

	if (session.status == 'complete' && session.payment_status == 'paid') {
		purchasedLessons = await getLessonsFromLineItems(session);
	}

	console.log('Checkout session:', session);

	res.status(200).json({status, paymentStatus, purchasedLessons});
});