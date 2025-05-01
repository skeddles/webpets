import { useCheckout } from '@stripe/react-stripe-js';

import ErrorMessage from './ErrorMessage';

interface EmailInputProps {
	email: string;
	setEmail: (email: string) => void;
	error: string | null;
	setError: (error: string | null) => void;
}

export function EmailInput ({ email, setEmail, error, setError }:EmailInputProps) {
	const checkout = useCheckout();

	const handleBlur = async () => {
		if (!email) return;
		const { isValid, message } = await validateEmail(email, checkout);
		if (!isValid) {
			setError(message);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		setEmail(e.target.value);
	};

	return (<>
			<h4>Email</h4>

			<input
				id="email"
				type="text"
				value={email}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder="you@example.com"
			/>

			<ErrorMessage message={error} />
	</>);
};


export async function validateEmail (email: string, checkout: ReturnType<typeof useCheckout>) {
	const updateResult = await checkout.updateEmail(email);
	const isValid = updateResult.type !== "error";
	return { isValid, message: !isValid ? updateResult.error.message : null };
}