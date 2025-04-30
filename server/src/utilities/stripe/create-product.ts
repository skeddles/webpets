import { stripe, PRODUCT_PRICES } from '../stripe';


export async function createProduct(productName: string, productDescription: string, type: ProductType) {
	if (!Object.keys(PRODUCT_PRICES).includes(type)) throw new Error(`Unsupported product type: ${type}`);
	
	const product = await stripe.products.create({
		name: productName,
		description: productDescription,
		metadata: {
			type: type,
		},
	});

	const price = await stripe.prices.create({
		unit_amount: PRODUCT_PRICES[type],
		currency: 'usd',
		product: product.id,
	});

	console.log('Created product/price for ',type,' "'+productName+'"', {
		product: product.id,
		price: price.id,
	});

	return { product, price };
}