import { useState, useEffect, useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AppStateContext } from './hooks/AppState';
import { useInitializeUser } from './hooks/initializeUser';

type Theme = 'light' | 'dark';

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
import Admin from './pages/Admin';

function App() {
	const { state: { user } } = useContext(AppStateContext);
    const [theme, setTheme] = useState<Theme>('dark');
	const initializeUser = useInitializeUser();
	const userInitialized = useRef(false);

    // Update the `data-theme` attribute on the root element when the theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    }

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
						<Route path="*" element={<Home />} />
					</Route>
				</Routes>
				<button onClick={toggleTheme}>
					Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
				</button>
			</>}
		</Router>
	)
}

export default App
