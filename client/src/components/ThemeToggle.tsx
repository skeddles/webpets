import { useState, useEffect } from 'react';

import '../css/ThemeToggle.css';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('dark');

    // Update the `data-theme` attribute on the root element when the theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    }

	return (<div className="ThemeToggle">
		<button onClick={toggleTheme}>
			Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
		</button>
	</div>);
}