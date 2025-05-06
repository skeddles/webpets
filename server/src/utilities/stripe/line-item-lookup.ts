import type { ExpandedCheckoutSession, ExpandedLineItem } from './get-expanded-checkout.js';
import { getLessonsByPriceId } from '../../queries/lesson/get-many-by-price-id.js';

export async function getLessonsFromLineItems(checkoutSession:ExpandedCheckoutSession) {
	const lineItems = checkoutSession.line_items.data;
	const purchasedLessonsIds = getPriceIdsOfType(lineItems, 'lesson');
	const purchasedLessons = await getLessonsByPriceId(purchasedLessonsIds);
	return purchasedLessons;
}

function getPriceIdsOfType(lineItems: ExpandedLineItem[], type: ProductType) {
	return lineItems.filter(li => li.price.product.metadata.type === type).map(li => li.price.id);
}