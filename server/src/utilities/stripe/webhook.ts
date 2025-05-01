import {Router} from 'express';
import { stripe } from '../stripe.js';
import getEnvironmentVariable from '../get-environment-variable.js';
import fulfillCheckout from './fulfill-checkout.js';
import bodyParser from 'body-parser';

const ENDPOINT_SECRET = getEnvironmentVariable('STRIPE_WEBHOOK_SECRET');

const router = Router();


const eventHandlers: Record<string, (id: any) => Promise<void>> = {
	'checkout.session.completed': fulfillCheckout,
	'checkout.session.async_payment_succeeded': fulfillCheckout,
};

router.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
	try {
		const signature = req.headers['stripe-signature'];
		if (!signature) throw new Error('Missing stripe signature header');
		
		const stripeEvent = stripe.webhooks.constructEvent(req.body, signature, ENDPOINT_SECRET);

		if (stripeEvent.type in eventHandlers)
			await eventHandlers[stripeEvent.type](stripeEvent);
		else {
			res.status(400).json({ error: 'Webhook handler not found' });
			return;
		}

		res.status(200).json({});
	} catch (error) {
		console.error('Error handling stripe webhook:', error);
		res.status(400).json({ error: 'Webhook Error' });
	}
});

export default router;