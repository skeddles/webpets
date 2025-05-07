import { useState, useCallback } from 'react';
import { useAppState } from '../hooks/AppState';
import useApiRequest from '../hooks/ApiRequest';
import LessonList from '../components/LessonList';
import Loading from '../components/Loading';
import usePolling from '../hooks/Polling';

import '../css/CheckoutComplete.css';

type CheckoutSessionInfo = {
	checkoutId: string;
	status: 'loading' | 'open' | 'complete' | 'expired';
	paymentStatus: 'unpaid' | 'paid' | 'no_payment_required';
	purchasedLessons: Lesson[];
};

interface CheckoutCompleteProps { }

export default function CheckoutComplete({ }: CheckoutCompleteProps) {
	const { dispatchState } = useAppState();
	const apiRequest = useApiRequest();

	const [checkoutSession, setCheckoutSession] = useState<CheckoutSessionInfo>({
		status: 'loading',
		checkoutId: '',
		paymentStatus: 'unpaid',
		purchasedLessons: [],
	});

	const getCheckoutSession = useCallback(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const sessionId = urlParams.get('session_id');
		if (!sessionId) throw new Error('No session id found in url');

		const result = await apiRequest('shop/checkout-status', { sessionId });

		setCheckoutSession({
			checkoutId: sessionId,
			status: result.status,
			paymentStatus: result.paymentStatus,
			purchasedLessons: result.purchasedLessons,
		});

		console.log('Checkout session:', result);
		if (result.status === 'complete' && result.paymentStatus === 'paid') {
			dispatchState({ type: 'CLEAR_SHOPPING_CART'});
			return true;
		}
		return false;
	}, [apiRequest]);

	usePolling(getCheckoutSession);

	const completeAndPaid = checkoutSession.status === 'complete' && checkoutSession.paymentStatus === 'paid';

	if (checkoutSession.status === 'loading') return <Loading />;

	return (<div className="CheckoutComplete">
		{!completeAndPaid && <IncompleteCheckout checkoutSession={checkoutSession} />}
		{completeAndPaid && <Checkout checkoutSession={checkoutSession} />}
	</div>);
}

function IncompleteCheckout({ checkoutSession }: { checkoutSession: CheckoutSessionInfo }) {
	return (<>
		<h1>Your Payment Is Being Processed...</h1>
		<p>Your payment is currently still being processed. This page will update when it is complete.</p>

		<div><b>Session ID:</b> {checkoutSession.checkoutId}</div>
		<div><b>Status:</b> {checkoutSession.status}</div>
		<div><b>Payment Status:</b> {checkoutSession.paymentStatus}</div>
		<Loading />
	</>);
}

function Checkout({ checkoutSession }: { checkoutSession: CheckoutSessionInfo }) {
	return (<>
		<h1>Thank you for your purchase!</h1>
		<div><strong>Session ID:</strong> {checkoutSession.checkoutId}</div>
		<p>Your payment has been successfully processed. You will receive an email confirmation shortly.</p>

		{checkoutSession.purchasedLessons.length > 0 && <>
			<h2>New Lessons:</h2>
			<LessonList lessons={checkoutSession.purchasedLessons} />
		</>}
	</>);
}