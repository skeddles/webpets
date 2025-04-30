import { stripe } from '../stripe';
import type { LineItem } from '../stripe';

export async function createCheckoutSession(lineItems:LineItem[]) {
	const session = await stripe.checkout.sessions.create({
		success_url: 'https://example.com/success',
		mode: 'payment',
		line_items: lineItems
	});

	return session;
}