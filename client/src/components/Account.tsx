import '../css/Account.css';
import { useAppState } from '../hooks/AppState';

interface AccountProps {

}

export default function Account({}: AccountProps) {
	const { state: { user } } = useAppState();

	return (<div className="Account">
		<div>{user.username} </div>
		<div>({user.admin && <span className="admin">Admin</span>})</div>
	</div>);
}