import { useEffect, useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AppStateContext } from './hooks/AppState';
import { useInitializeUser } from './hooks/initializeUser';

import Layout from './Layout';
import LayoutApp from './LayoutApp';
import Article from './pages/article';
import Lesson from './pages/Lesson';
import TestArticle from './pages/test-article';
import SplashScreen from './components/SplashScreen';
import Unauthenticated from './pages/Unauthenticated';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import CheckoutComplete from './pages/CheckoutComplete';
import Admin from './pages/Admin';

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

	return (<Router>
			{user == 'loading' && <SplashScreen />}
			{user == 'unregistered' && <> 
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Unauthenticated />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="*" element={<Unauthenticated />} />
					</Route>
				</Routes>
			</>}
			{typeof user === 'object' && <>
				<Routes>
					<Route path="/" element={<LayoutApp />}>
						<Route index element={<Home/>} />
						<Route path="/test" element={<TestArticle />} />
						<Route path="/test2" element={<Article />} />
						<Route path="/lesson/:slug" element={<Lesson />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/checkout-complete" element={<CheckoutComplete />} />
						<Route path="*" element={<Home />} />
					</Route>
				</Routes>
			</>}
		</Router>
	)
}

export default App;