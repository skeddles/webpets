import { useState } from "react";
import { PaymentElement, AddressElement, useCheckout } from '@stripe/react-stripe-js';

import { EmailInput, validateEmail } from './EmailInput';
import ErrorMessage from "./ErrorMessage";

import '../css/CheckoutForm.css';

interface ValidateEmailResult {
	isValid: boolean;
	message: string | null;
}

export default function CheckoutForm () {
	const checkout = useCheckout();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		const { isValid, message }: ValidateEmailResult = await validateEmail(email, checkout);
		if (!isValid) {
			setEmailError(message);
			setError(message);
			setIsLoading(false);
			return;
		}

		const result = await checkout.confirm();

		if (result.type == 'error') 
			setError(result.error.message);
		
		setIsLoading(false);
	};

	return (<div className="CheckoutForm">
		<p className="info">Enter your email and billing address to proceed with the payment. Your payment will be processed securely by Stripe. Your billing information and billing information will be used only for payment processing by Stripe and will not be stored by Pixel School or associated with your Pixel School account.</p>
		<form id="payment-form" onSubmit={handleSubmit}>
			<EmailInput
				email={email}
				setEmail={setEmail}
				error={emailError}
				setError={setEmailError}
			/>

			<h4>Billing Address</h4>
			<AddressElement id="billing-address-element" options={{ mode: 'billing' }} />

			<h4>Payment</h4>
			<PaymentElement id="payment-element" />

			<button disabled={isLoading} id="submit">
				<span id="button-text">
					{isLoading ? (
						<div className="spinner" id="spinner"></div>
					) : (
						`Pay ${checkout.total.total.amount} now`
					)}
				</span>
			</button>

			<ErrorMessage message={error} />
		</form>
	</div>);
}


