import { useContext } from 'react';
import { AppStateContext } from './AppState';

export function useInitializeUser () {
	const { dispatchState } = useContext(AppStateContext);

	return async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			return dispatchState({type: 'SET_UNAUTHENTICATED'});
		}

		try {
			const response = await fetch(import.meta.env.VITE_API_URL + '/api/profile', {
				method: 'post',
				headers: {'Authorization': `Bearer ${token}`}
			});
			
			if (!response.ok) throw new Error('request failed');
			const data = await response.json();
			
			dispatchState({type: 'SET_USER', user: {
				_id: data._id, 
				username: data.username, 
				token: token, 
				admin: !!data.admin,
			}});

			console.log('initialized user', data);
		} catch (error) {
			dispatchState({type: 'SET_UNAUTHENTICATED'});
			console.error('Error fetching profile data:', error);
		}
	}
}