import { useEffect, useState } from 'react';
import useApiRequest from '../hooks/ApiRequest';

import Loading from '../components/Loading';

import '../css/CheckoutComplete.css';


interface CheckoutCompleteProps {}

export default function CheckoutComplete({}: CheckoutCompleteProps) {
	const apiRequest = useApiRequest();

	const [status, setStatus] = useState('loading');

	useEffect(() => {getCheckoutSession()}, []);
	
	async function getCheckoutSession() {
		const urlParams = new URLSearchParams(window.location.search);
		const sessionId = urlParams.get('session_id');
		if (!sessionId) throw new Error('No session id found in url');
		
		const { status } = await apiRequest('shop/checkout-status', { sessionId })

		if (status == 'complete') 
			setStatus('complete');
		
		else 
			setStatus('error');
	}	


	return (<div className="CheckoutComplete">

		{status == 'loading' && <Loading />}

		{status == 'error' && <>
			<h1>Something went wrong</h1>
			<p>We were unable to process your order. Please try again.</p>
		</>}

		{status == 'complete' && <>
			<h1>Thank you for your purchase!</h1>
			<p>Your order is being processed. You will receive an email confirmation shortly.</p>
			<Loading />
		</>}

		
	</div>);
}

