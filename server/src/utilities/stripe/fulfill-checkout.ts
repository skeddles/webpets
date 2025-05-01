import { stripe } from '../stripe.js';
import Stripe from 'stripe';

type CheckoutSessionCompletedEvent = Stripe.Event & { type: 'checkout.session.completed' };
type CheckoutSessionAsyncPaymentSucceededEvent = Stripe.Event & { type: 'checkout.session.async_payment_succeeded' };
type StripeCompleteCheckoutEvent = CheckoutSessionCompletedEvent | CheckoutSessionAsyncPaymentSucceededEvent;

export default async function fulfillCheckout(event:StripeCompleteCheckoutEvent) {

	const sessionId = event.data.object.id

	const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {expand: ['line_items']});


	if (checkoutSession.payment_status !== 'unpaid') {
		console.log('Payment was successful:', checkoutSession);

		const purchasedItems = checkoutSession.line_items?.data

		console.log('Purchased items:', purchasedItems, JSON.stringify(purchasedItems, null, 2));
	}
}