import Stripe from 'stripe';
import { stripe } from '../stripe.js';

export type ExpandedLineItem = Stripe.LineItem & {
    price: Stripe.Price & { 
        product: Stripe.Product & { 
            metadata: { type: string } 
        } 
    } 
};

export type ExpandedCheckoutSession = Stripe.Checkout.Session & {
    line_items: {
        data: ExpandedLineItem[];
    };
};

export async function getExpandedCheckoutSession(sessionId: string): Promise<ExpandedCheckoutSession> {
    const options = {
        expand: ['line_items.data.price.product']
    };

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, options);

    return checkoutSession as unknown as ExpandedCheckoutSession;
}