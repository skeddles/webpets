import { addUserPurchases } from '../../queries/user/add-purchases.js';
import { stripe } from '../stripe.js';
import Stripe from 'stripe';
import { insertPurchase } from '../../queries/purchase/insert.js';
import { getLessonsByPriceId } from '../../queries/lesson/get-many-by-price-id.js';
import sendDiscordWebhook from '../send-discord-webhook.js';



type CheckoutSessionCompletedEvent = Stripe.Event & { type: 'checkout.session.completed' };
type CheckoutSessionAsyncPaymentSucceededEvent = Stripe.Event & { type: 'checkout.session.async_payment_succeeded' };
type StripeCompleteCheckoutEvent = CheckoutSessionCompletedEvent | CheckoutSessionAsyncPaymentSucceededEvent;

type ExpandedLineItem = Stripe.LineItem & {
	price: Stripe.Price & { 
		product: Stripe.Product & { 
			metadata: { type: string } 
		} 
	} 
};


export default async function fulfillCheckout(event:StripeCompleteCheckoutEvent) {
	try {
		const sessionId = event.data.object.id;
		const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {expand: ['line_items.data.price.product']});

		if (checkoutSession.payment_status == 'unpaid') throw new Error('Payment status is unpaid');

		const lineItems = checkoutSession.line_items?.data as ExpandedLineItem[];
		const userId = checkoutSession.client_reference_id;
		if (!userId) throw new Error('Missing user ID in checkout session');

		const purchasedProductPriceIds = lineItems.map(li => li.price.id);
		const purchasedLessonsIds = (await getLessonsByPriceId(getPriceIdsOfType(lineItems, 'lesson'))).map(lesson => lesson._id);

		await addUserPurchases(userId, purchasedLessonsIds);
		await insertPurchase(userId, sessionId, purchasedProductPriceIds);
	} catch (error) {
		sendDiscordWebhook('ERROR', error);
		throw error; 
	}
}



function getPriceIdsOfType(lineItems: ExpandedLineItem[], type: string) {
	return lineItems.filter(li => li.price.product.metadata.type === type).map(li => li.price.id);
}