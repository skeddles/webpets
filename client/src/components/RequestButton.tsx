import { JSX, useState } from 'react';
import useApiRequest from '../hooks/ApiRequest';

import LoadingButton from './LoadingButton';

interface RequestButtonProps {
	text: string;
	icon?: JSX.Element;
	apiPath: string;
	requestBody?: object;
	onSuccess: (data: any) => void;
	onError?: (data: any) => void;
	setErrorMessage: (message: string) => void;
	gaEvent?: GaEventObject;
	className?: string;
	disabled?: boolean;
	ref?: React.RefObject<HTMLButtonElement | null>; 
}

type GaEventObject = {
	action: string;
	label?: string;
	labelFromData?: string;
}

export default function RequestButton({ text, icon, apiPath, requestBody, onSuccess, onError, setErrorMessage, className, disabled, ref }: RequestButtonProps) {
	const [loading, setLoading] = useState(false);
	const apiRequest = useApiRequest();

	async function handleClick() {
		if (loading) return;
		setLoading(true);
		setErrorMessage('');
		let data;
		try {
			data = await apiRequest(apiPath, requestBody);
			setLoading(false);
			onSuccess(data);
		} catch (error) {
			console.error('api request failed:', error);
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(String(error));
			}

			if (onError && typeof error === 'object' && error !== null && 'responseData' in error) 
				onError((error as { responseData: any }).responseData);
			
			setLoading(false);
		}
	}

	return (
		<LoadingButton
			text={text}
			loading={loading}
			onClick={handleClick}
			disabled={loading || disabled}
			icon={icon}
			className={className||''}
			ref={ref}
		/>
	);
}