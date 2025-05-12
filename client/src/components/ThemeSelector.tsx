import { useState, useEffect } from 'react';

import Dropdown from './Dropdown';

type Theme = 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'pink';

export default function ThemeSelector() {
	const [theme, setTheme] = useState<Theme>('blue');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

	const themes:Theme[] = ['blue', 'yellow', 'green', 'red', 'purple', 'pink'];

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