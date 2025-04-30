
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';

import CheckoutForm from '../components/CheckoutForm';

interface CheckoutProps {}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

const STRIPE_CHECKOUT_OPTIONS = {
	appearance: {
		theme: "flat" as "flat",
		variables: {
			colorBackground: '#7ba8b3',
			colorText: '#8b2149',
		},
	}
}

export default function Checkout({}: CheckoutProps) {
	const { state: { shoppingCart } } = useAppState();
	const apiRequest = useApiRequest();

	async function createCheckoutSession() {
		const {clientSecret} = await apiRequest('shop/checkout', { shoppingCart });
		return clientSecret;
	}

	return (<div className="Checkout">
		<h1>Checkout</h1>
	    <CheckoutProvider
			stripe={stripePromise}
			options={{
				fetchClientSecret: createCheckoutSession,
				elementsOptions: STRIPE_CHECKOUT_OPTIONS,
			}}>
        
			<CheckoutForm />

		</CheckoutProvider>
	</div>);
}