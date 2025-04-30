import Stripe from 'stripe';
import getEnvironmentVariable from './get-environment-variable';

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

const stripeKey = getEnvironmentVariable('STRIPE_SECRET_KEY');
export const stripe = new Stripe(stripeKey);

export const PRODUCT_PRICES: Record<ProductType, number> = {
	lesson: 499,
};
