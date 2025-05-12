import { useEffect, useContext, useRef } from 'react';
import { RouterProvider } from 'react-router';
import { AppStateContext } from './hooks/AppState';
import { useInitializeUser } from './hooks/initializeUser';
import { router } from './routers/Router';
import { unregisteredRouter } from './routers/UnregisteredRouter';

import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';

import './css/App.css';

function App() {
	const { state: { user } } = useContext(AppStateContext);

	const initializeUser = useInitializeUser();
	const userInitialized = useRef(false);

	useEffect(() => {
		if (userInitialized.current) return;
		userInitialized.current = true;
		initializeUser();
	}, []);

	let content;
	if (user === 'loading') {
		content = <SplashScreen />;
	} else if (user === 'unregistered') {
		content = <RouterProvider router={unregisteredRouter} />;
	} else if (typeof user === 'object') {
		content = <RouterProvider router={router} />;
	} else {
		throw new Error('Invalid user state');
	}

	return (
		<ErrorBoundary>
			{content}
		</ErrorBoundary>
	);
}

export default App;