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
	const [loading, setLoading] = useState(true);
	const apiRequest = useApiRequest();

	async function createCheckoutSession() {
		const {clientSecret} = await apiRequest('shop/checkout', { shoppingCart });
		setLoading(false);
		return clientSecret;
	}

	return (<div className="Checkout">
		<h1>Checkout</h1>
		{loading && <Loading />}
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
