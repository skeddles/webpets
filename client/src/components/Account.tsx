import { useState } from 'react';
import { useAppState } from '../hooks/AppState';

import ThemeSelector from './ThemeSelector';

import '../css/Account.css';

export default function Account() {
	const { state: { user } } = useAppState();
	const [open, setOpen] = useState(false);

	return (<div className={"Account" + (open ? " open" : "")}>

		<div className="user-button">

			<button onClick={() => setOpen(!open)}>
				{user.username}
			</button>
		</div>

		<div className="content">

			<div>({user.admin && <span className="admin">Admin</span>})</div>
			
			<ThemeSelector />

		</div>

	</div>);
}