import { useContext } from 'react';
import { AppStateContext } from './AppState';

export function useInitializeUser () {
	const { dispatchState } = useContext(AppStateContext);

	return async () => {
		console.log('initializing user...');
		const token = localStorage.getItem('token');
		if (!token) {
			console.log('no token found, setting user to unauthenticated');
			return dispatchState({type: 'SET_UNAUTHENTICATED'});
		}

		try {
			const response = await fetch(import.meta.env.VITE_API_URL + '/user/self', {
				method: 'post',
				headers: {'Authorization': `Bearer ${token}`}
			});
			
			if (!response.ok) throw new Error('request failed');
			const data = await response.json();
			
			dispatchState({type: 'SET_USER', user: {
				_id: data.user._id, 
				username: data.user.username, 
				token: token, 
				admin: !!data.user.admin,
			}});

			console.log('initialized user', data);
		} catch (error) {
			dispatchState({type: 'SET_UNAUTHENTICATED'});
			console.error('Error fetching profile data:', error);
		}
	}
}