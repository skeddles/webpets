import {createRouter, is} from '../../utilities/create-router.js';
import { getLesson } from '../../queries/lesson/get.js';
import { createCheckoutSession } from '../../utilities/stripe/create-checkout.js';
import type { LineItem } from '../../utilities/stripe.js';


const schema = {
	shoppingCart: is.array(
		is.object({
			id: is.string(),
			type: is.string(),
			price: is.number(),
		}),
	).min(1),
};

export default createRouter(schema, async (req, res) => {
	const { shoppingCart } = req.body;
	const lineItems:LineItem[] = await convertShoppingCartToLineItems(shoppingCart);
	const session = await createCheckoutSession(lineItems);
	res.status(200).json({ session });
});

async function convertShoppingCartToLineItems(shoppingCart: ProductInCart[]) {
	const lineItems:LineItem[] = [];

	for (const item of shoppingCart) {
		if (item.type == 'lesson') {
			const lesson = await getLesson(item.id);

			lineItems.push({
				price: lesson.priceId,
				quantity: 1,
			});
		}
		else throw new Error(`Unsupported product type: ${item.type}`);
	}

	return lineItems;
}