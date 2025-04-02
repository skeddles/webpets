import { useState, useEffect } from 'react'
import './App.css'

type Theme = 'light' | 'dark';

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

	return (
		<>
			<h1>Lospec Pixel School</h1>
			<p>Welcome!</p>
			<button onClick={toggleTheme}>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
		</>
	)
}

export default App
