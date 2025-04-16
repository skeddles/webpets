import { useState, useEffect } from 'react';

import '../css/ThemeToggle.css';
import Dropdown from './Dropdown';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

	const themes:Theme[] = ['light', 'dark'];

	return (<div className="ThemeToggle">
		<h4>Theme</h4>

		<Dropdown
			label="Theme"
			value={theme}
			setValue={setTheme}
			options={themes}
			/>
	</div>);
}