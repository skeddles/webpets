import { useState } from 'react';
import LoadingButton from './LoadingButton';

type AuthPath = 'login' | 'register';

interface AuthButtonProps {
	text: string;
	authPath: AuthPath;
	requestBody: object;
	onSuccess: (data: any) => void;
	setErrorMessage: (message: string) => void;
	disabled?: boolean;
	unauthenticated?: true;
	ref?: React.RefObject<HTMLButtonElement | null>;
}

const API_URL = import.meta.env.VITE_NGROK_API_URL || import.meta.env.VITE_API_URL;

export default function AuthButton({ text, authPath, requestBody, onSuccess, setErrorMessage, disabled, ref }: AuthButtonProps) {
	const [loading, setLoading] = useState(false);

	async function handleClick() {
		if (loading) return;
		setLoading(true);
		setErrorMessage('');
		try {
			const data = await authRequest(authPath, requestBody);
			setLoading(false);
			onSuccess(data);
		} catch (error) {
			console.error('auth request failed:', error);
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(String(error));
			}
			setLoading(false);
		}
	}

	const disableButton = disabled || loading;

	return (
		<LoadingButton
			text={text}
			loading={loading}
			onClick={handleClick}
			disabled={disableButton}
			sparkle={!disableButton && authPath == 'register'}
			ref={ref}
		/>
	);
}


async function authRequest (path: AuthPath, body: object) {
	const url = API_URL + '/auth/' + path;
	const options:RequestInit = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: body ? JSON.stringify(body) : undefined
	};

	const response = await fetch(url, options)
	const data = await response.json();
	
	if (!response.ok) {
		if (response.status !== 500) throw new Error(data.error);
		else throw new Error('Error sending request. Please try again.');
	}

	return data;
};