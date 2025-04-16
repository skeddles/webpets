import { useState, useEffect } from 'react';

import Dropdown from './Dropdown';

type Theme = 'light' | 'dark';

export default function ThemeSelector() {
	const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

	const themes:Theme[] = ['light', 'dark'];

	return (<div className="ThemeSelector">
		<h4>Theme</h4>

		<Dropdown
			label="Theme"
			value={theme}
			setValue={setTheme}
			options={themes}
			/>
	</div>);
}