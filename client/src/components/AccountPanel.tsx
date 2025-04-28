import { useAppState } from '../hooks/AppState';

import ThemeSelector from './ThemeSelector';

import '../css/AccountPanel.css';

interface AccountProps {
	open: boolean;
}

export default function Account({open}: AccountProps) {
	const { state: { user } } = useAppState();
	
	let contentClass = "content";
	if (open) contentClass += " open";


	return (<div className="AccountPanel">
		<div className={contentClass}>
			<div>({user.admin && <span className="admin">Admin</span>})</div>
			<ThemeSelector />
		</div>
	</div>);
}