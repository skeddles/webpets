import { useState } from "react";
import { PaymentElement, AddressElement, useCheckout } from '@stripe/react-stripe-js';


interface ValidateEmailResult {
	isValid: boolean;
	message: string | null;
}

export default function CheckoutForm () {
	const checkout = useCheckout();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsLoading(true);

		const { isValid, message }: ValidateEmailResult = await validateEmail(email, checkout);
		if (!isValid) {
			setEmailError(message);
			setMessage(message);
			setIsLoading(false);
			return;
		}

		const result = await checkout.confirm();

		if (result.type == 'error') 
			setMessage(result.error.message);
		
		setIsLoading(false);
	};

	return (
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
			
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
}


interface EmailInputProps {
	email: string;
	setEmail: (email: string) => void;
	error: string | null;
	setError: (error: string | null) => void;
}

const EmailInput = ({ email, setEmail, error, setError }:EmailInputProps) => {
	const checkout = useCheckout();

	const handleBlur = async () => {
		if (!email) return;
		const { isValid, message } = await validateEmail(email, checkout);
		if (!isValid) setError(message);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		setEmail(e.target.value);
	};

	return (<>
			<label>
				Email
				<input
					id="email"
					type="text"
					value={email}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="you@example.com"
				/>
			</label>
			{error && <div id="email-errors">{error}</div>}
	</>);
};


const validateEmail = async (email: string, checkout: ReturnType<typeof useCheckout>) => {
	const updateResult = await checkout.updateEmail(email);
	const isValid = updateResult.type !== "error";
	return { isValid, message: !isValid ? updateResult.error.message : null };
}
