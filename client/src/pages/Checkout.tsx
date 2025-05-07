import getCssColor from '../util/get-css-color';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';

import CheckoutForm from '../components/CheckoutForm';
import Loading from '../components/Loading';
import { useState } from 'react';

interface CheckoutProps {}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);



export default function Checkout({}: CheckoutProps) {
	const { state: { shoppingCart } } = useAppState();
	const [loading, setLoading] = useState(shoppingCart.length > 0);
	const apiRequest = useApiRequest();

	const [error, setError] = useState<string | null>(null);

	async function createCheckoutSession() {
		try {
			if (shoppingCart.length == 0) {
				setLoading(false);
				setError('Your cart is empty. Please add items to your cart before proceeding to checkout.');
				return;
			}

			const result = await apiRequest('shop/checkout', { shoppingCart });
			setLoading(false);
			setError('Some items in your cart are already purchased. They will not be included in the checkout.');
			return result.clientSecret;
		} catch (error) {
			console.error('Error creating checkout session:', error);
			setLoading(false);
			if (error instanceof Error && error.message == 'No purchasable items') {
				setError('There were no purchasable items in your cart. This means either you cart is empty, or all the items you have added are either nonexistant or you already own them. Please check your cart and try again.');
			}
			else {
				setError('An error occurred while creating the checkout session. Please try again later.');
			}
			throw error;
		}
	}

	return (<div className="Checkout">
		<h1>Checkout</h1>
		{loading && <Loading />}
	    {error && <p>{error}</p>}
		<CheckoutProvider
			stripe={stripePromise}
			options={{
				fetchClientSecret: createCheckoutSession,
				elementsOptions: generateStripCheckoutOptions(),
			}}>
        
			<CheckoutForm />

		</CheckoutProvider>
	</div>);
}

function generateStripCheckoutOptions() {
	try {
		return {
			appearance: {
				theme: "flat" as "flat",
				variables: {
					fontFamily: 'Fredoka, sans-serif',
					colorPrimary: getCssColor('--text'),
					colorBackground: getCssColor('--bg-inset'),
					colorText: getCssColor('--text'),
					colorDanger: getCssColor('--red'),
					borderRadius: '0.4em'
				},
				rules: {
					'.AccordionItem': {
						backgroundColor: getCssColor('--secondary'),
						color: getCssColor('--text'),
						borderWidth: '0',
					},
					'.Input': {
						borderTop: '0.125em solid '+getCssColor('--bg-inset-edge'),
					},
					'.Input:focus': {
						outline: 'solid 2px '+getCssColor('--primary'),
						boxShadow: 'none',
					},

				}
			}
		}
	} catch (error) {
		console.error('Error generating Stripe checkout options:', error);
		return {
			appearance: {
				theme: "flat" as "flat",
				variables: {},
			}
		}
	}
}
