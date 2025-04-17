import { useState } from 'react';
import useApiRequest from '../hooks/ApiRequest';

import '../css/CompletedButton.css';

import Check from '../assets/svg/check.svg?react';
import Minus from '../assets/svg/minus.svg?react';
import LoadingSpinner from './LoadingSpinner';


interface CompletedButtonProps {
	complete: boolean;
	type: 'lesson' | 'assignment';
	contentId: string;
	onSuccess: (complete: boolean) => void;
}

export default function CompletedButton({complete, type, contentId, onSuccess}: CompletedButtonProps) {
	const [loading, setLoading] = useState(false);
	const apiRequest = useApiRequest();


	let currentIcon = complete ? <Check /> : <Minus />;
	if (loading) currentIcon = <LoadingSpinner />;

	async function handleClick() {
		if (loading) return;
		setLoading(true);
		//setErrorMessage('');
		let data;
		try {
			const newValue = !complete;
			data = await apiRequest('completion', {type, contentId, complete: newValue});
			setLoading(false);
			onSuccess(newValue);
		} catch (error) {
			console.error('api request failed:', error);
			if (error instanceof Error) {
				//setErrorMessage(error.message);
			} else {
				//setErrorMessage(String(error));
			}

			//if (onError && typeof error === 'object' && error !== null && 'responseData' in error) 
				//onError((error as { responseData: any }).responseData);
			
			setLoading(false);
		}
	}

	let buttonClass = complete ? 'completed' : 'incomplete';
	if (loading) buttonClass += ' loading';

	return (<div className="CompletedButton">
		<button className={buttonClass} onClick={handleClick}>
			<div className="text">
				{complete ? 'Completed' : 'Incomplete'}
			</div>

			<div className="icon">{currentIcon}</div>
		</button>
	</div>);
}