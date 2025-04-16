import { Outlet, Link } from 'react-router';
import { useAppState } from './hooks/AppState';

import './css/App.css';

const Layout = () => {
	const { state: { user } } = useAppState();

	return (<div className="App">

		<div className="navigation">
			<Link to="/">home</Link> <br />
			<Link to="/lesson/test-lesson">test Lessons</Link> <br />
			<Link to="/admin">Admin</Link> <br />
		</div>

		<div className="tab">
			<Outlet />
		</div>

		<div className="account">
			<div>{user.username} </div>
			<div>({user.admin && <span className="admin">Admin</span>})</div>
		</div>
	</div>);
};

export default Layout;