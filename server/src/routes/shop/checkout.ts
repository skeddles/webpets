import {createRouter, is} from '../../utilities/create-router.js';
import { getLesson } from '../../queries/lesson/get.js';
import { createCheckoutSession } from '../../utilities/stripe/create-checkout.js';
import type { LineItem } from '../../utilities/stripe.js';
import { getUser } from '../../queries/user/get.js';


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
	const user = await getUser(req.userId);

	const lineItems:LineItem[] = await convertShoppingCartToLineItems(user, shoppingCart);
	const skippedItems:number = shoppingCart.length - lineItems.length;

	if (lineItems.length == 0) {
		res.status(400).json({ error: 'No purchasable items' });
		return;
	}

	const session = await createCheckoutSession(req.userId, lineItems);
	res.status(200).json({ clientSecret: session.client_secret, skippedItems });
});

async function convertShoppingCartToLineItems(user:User, shoppingCart: ProductInCart[]) {
	const lineItems:LineItem[] = [];

	for (const item of shoppingCart) {
		if (item.type == 'lesson') {
			if (productId(item.id).existsIn(user.purchasedLessons)) continue;
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

function productId(id:string) {
	return {
		existsIn: (array:ObjectId[]) => array.map(l => l.toString()).includes(id),
	};
}