import { Purchases, id } from '../../database.js';

type PurchaseInsert = Omit<Purchase, '_id'>;

export async function insertPurchase(userId: IdOrString, checkoutSessionId: string, purchasedProductPriceIds: string[]) {
	const purchaseInsert: PurchaseInsert = {
		userId: id(userId),
		checkoutSessionId,
		purchasedProductPriceIds,
	};

	const insertResult = await Purchases.insertOne(purchaseInsert);
	if (!insertResult.acknowledged) throw new Error("Insert Failed");

	const purchase = {
		_id: insertResult.insertedId,
		...purchaseInsert
	};
	return purchase as Purchase;
}