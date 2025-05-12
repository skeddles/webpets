import { useState } from 'react';
import { useAppState } from '../hooks/AppState';

import AccountPanel from './AccountPanel';

import '../css/RightSidebar.css';

export default function RightSidebar() {
	const { state: { user } } = useAppState();
	const [openPanel, setOpenPanel] = useState('');

	const sideBarIsOpenClass = openPanel ? " open" : "";

	function togglePanel(panelName:string) {
		if (openPanel === panelName) 
			setOpenPanel('');
		else 
			setOpenPanel(panelName);
	}

	return (<div className={"RightSidebar" + sideBarIsOpenClass}>

		<div className="controls">
			<button onClick={()=>togglePanel('account')}>
				{user.username}
			</button>
		</div>

		<AccountPanel open={openPanel=='account'}/>

	</div>);
}