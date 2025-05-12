import { useState, useEffect } from 'react';

import '../css/ThemeSelector.css';

type Theme = 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'pink';

const THEMES = {
	blue: '#1b44ff',
	yellow: '#f2e600',
	green: '#96f52a',
	red: '#ff432a',
	purple: '#b22efe',
	pink: '#ff4680',
};

export default function ThemeSelector() {
	const [theme, setTheme] = useState<Theme>('blue');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme]);

	return (<div className="ThemeSelector">
		<h4>Theme</h4>

		<div className="themes">
			{Object.keys(THEMES).map((t) => (
				<button
					key={t}
					className={`theme ${t} ${theme === t ? 'active' : ''}`}
					onClick={() => setTheme(t as Theme)}
					style={{backgroundColor: THEMES[t as Theme]}}
				></button>
			))}
		</div>
	</div>);
}