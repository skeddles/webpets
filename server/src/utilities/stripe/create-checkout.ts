import { stripe } from '../stripe';
import type { LineItem } from '../stripe';
import getEnvironmentVariable from '../get-environment-variable';

const CLIENT_URL = getEnvironmentVariable('CLIENT_URL');

export async function createCheckoutSession(userId:ObjectId, lineItems:LineItem[]) {
	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		ui_mode: 'custom',
		automatic_tax: {enabled: true},
		return_url: CLIENT_URL + `/checkout-complete?session_id={CHECKOUT_SESSION_ID}`,
		line_items: lineItems,
		client_reference_id: userId.toString(),
	});

	return session;
}