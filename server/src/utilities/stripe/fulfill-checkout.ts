import { addUserPurchases } from '../../queries/user/add-purchases.js';
import Stripe from 'stripe';
import { insertPurchase } from '../../queries/purchase/insert.js';

import sendDiscordWebhook from '../send-discord-webhook.js';
import { getExpandedCheckoutSession } from './get-expanded-checkout.js';
import type { ExpandedLineItem } from './get-expanded-checkout.js';
import { getLessonsFromLineItems } from '../../utilities/stripe/line-item-lookup.js';

type CheckoutSessionCompletedEvent = Stripe.Event & { type: 'checkout.session.completed' };
type CheckoutSessionAsyncPaymentSucceededEvent = Stripe.Event & { type: 'checkout.session.async_payment_succeeded' };
type StripeCompleteCheckoutEvent = CheckoutSessionCompletedEvent | CheckoutSessionAsyncPaymentSucceededEvent;


export default async function fulfillCheckout(event:StripeCompleteCheckoutEvent) {
	try {
		const sessionId = event.data.object.id;
		const checkoutSession = await getExpandedCheckoutSession(sessionId);

		if (checkoutSession.payment_status == 'unpaid') throw new Error('Payment status is unpaid');

		const lineItems = checkoutSession.line_items?.data as ExpandedLineItem[];
		const userId = checkoutSession.client_reference_id;
		if (!userId) throw new Error('Missing user ID in checkout session');

		const purchasedProductPriceIds = lineItems.map(li => li.price.id);
		const purchasedLessonsIds = (await getLessonsFromLineItems(checkoutSession)).map(lesson => lesson._id);

		await insertPurchase(userId, sessionId, purchasedProductPriceIds);
		await addUserPurchases(userId, purchasedLessonsIds);
		
		console.log('Checkout session fulfilled');
		sendCompletedWebook(event);
	} catch (error) {
		sendDiscordWebhook('ERROR', error);
		throw error; 
	}
}

function sendCompletedWebook (event:StripeCompleteCheckoutEvent) {

	const data = event.data.object as Stripe.Checkout.Session;

	let text = '# New Purchase:\n\n';

	text += `**User ID:** ${data.client_reference_id}\n`;
	text += `**Session ID:** ${data.id}\n`;
	text += `**Payment Status:** ${data.payment_status}\n`;

	if (data.amount_total && data.currency) 
		text += `**Total Amount:** ${data.amount_total / 100} ${data.currency.toUpperCase()}\n`;
	else
		text += `**Total Amount:** N/A\n`;

	sendDiscordWebhook('PURCHASE', text);
}