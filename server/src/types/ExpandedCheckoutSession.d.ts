type ExpandedCheckoutSession = Stripe.Checkout.Session & {
	line_items: {
		data: ExpandedLineItem[];
	};
};
