import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

type Theme = 'light' | 'dark';

import Layout from './Layout';
import Article from './pages/article';
import TestArticle from './pages/test-article';

function App() {
    const [theme, setTheme] = useState<Theme>('dark')

    // Update the `data-theme` attribute on the root element when the theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    }

	return (<Router>

			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<TestArticle/>} />
					<Route path="/test2" element={<Article />} />
				</Route>
			</Routes>
			<button onClick={toggleTheme}>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>

		</Router>
	)
}

export default App
