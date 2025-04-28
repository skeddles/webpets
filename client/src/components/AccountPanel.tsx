import { useAppState } from '../hooks/AppState';

import ThemeSelector from './ThemeSelector';

import '../css/AccountPanel.css';

interface AccountProps {}

export default function Account({}: AccountProps) {
	const { state: { user } } = useAppState();
	

	return (<div className="Account">
		<div className="content">
			<div>({user.admin && <span className="admin">Admin</span>})</div>
			<ThemeSelector />
		</div>
	</div>);
}