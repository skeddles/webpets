import { useEffect, useRef } from 'react';

const POLLING_INTERVALS = [
	0.5, 0.5, 0.5, 0.5, 
	1, 1, 1, 1,
	2.5, 2.5, 2.5, 2.5, 
	5, 5, 5, 5,
	10, 10, 10, 10,
	30, 30, 30, 30,
	60, 60, 60, 60,
	60 * 5, 60 * 5, 60 * 5, 60 * 5,
	60 * 10, 60 * 10, 60 * 10, 60 * 10,
];

export default function usePolling(callback: () => Promise<boolean>) {
	const isPolling = useRef(true);
	const attempts = useRef(0);
	const pollingTimeout = useRef<NodeJS.Timeout | null>(null);

	const callbackRef = useRef(callback)

	console.log('mounting usePolling...');

	useEffect(() => {
		console.log('usePolling effect triggered');
		isPolling.current = true;
		
		const poll = async () => {
			if (!isPolling.current) {
				console.log('Polling stopped, exiting...');
				return;
			}

			console.log('waiting for', getPollingInterval(attempts.current), 'ms before next poll');
			pollingTimeout.current = setTimeout(async () => {
				try {
					console.log('Polling attempt:', attempts.current + 1);
					const result = await callbackRef.current();
					if (result) {
						isPolling.current = false; // Stop polling only if the result is true
						if (pollingTimeout.current) clearTimeout(pollingTimeout.current);
						console.log('Polling completed successfully after', attempts.current + 1, 'attempts');
						return;
					}

					// If the result is false, continue polling
					attempts.current += 1;
					poll();
				} catch (error) {
					console.error('Polling error:', error);
					attempts.current += 1;
					poll();
				}
			}, getPollingInterval(attempts.current));
		};

		poll();
		console.log('Polling started');

		return () => {
			console.log('Cleaning up usePolling...');
			isPolling.current = false;
			if (pollingTimeout.current) clearTimeout(pollingTimeout.current);
		};
	}, []);
}

function getPollingInterval(attempts: number): number {
	if (attempts < POLLING_INTERVALS.length) 
		return POLLING_INTERVALS[attempts] * 1000; 
	else 
		return 30 * 60 * 1000;
}