import { stripe } from '../stripe';
import type { LineItem } from '../stripe';

export async function createCheckoutSession(lineItems:LineItem[]) {
	const session = await stripe.checkout.sessions.create({
		mode: 'payment',
		ui_mode: 'custom',
		automatic_tax: {enabled: true},
		return_url: `http://localhost:3364/return?session_id={CHECKOUT_SESSION_ID}`,
		line_items: lineItems,
	});

	return session;
}