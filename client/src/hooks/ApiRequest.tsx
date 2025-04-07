import { useAppState } from './AppState';

type ApiRequest = (path: string, body?: object) => Promise<any>;

const API_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {responseData?: any;}

export default function useApiRequest(): ApiRequest {
	const appState = useAppState();
	if (typeof appState.state.user !== 'object' || !('token' in appState.state.user)) {
		throw new Error('user context not found');
	}
	const token = (appState.state.user as ClientUser).token;

	return async (path: string, body: object | undefined) => {
		const url = API_URL + '/' + path;
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: body ? JSON.stringify(body) : undefined
		};
		const response = await fetch(url, options);
		const data = await response.json();
		
		if (!response.ok) {
			const error = new ApiError(data.error);
			error.responseData = data;
			if (response.status !== 500) throw error;
			else throw new Error('Error sending request. Please try again.');
		}

		else return data;
	};
}
