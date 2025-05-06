type Purchase = {
	_id: IdOrString;
	userId: IdOrString;
	checkoutSessionId: string;
	purchasedProductPriceIds: string[];
}