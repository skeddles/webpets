import { Outlet, Link } from 'react-router';
import { useAppState } from './hooks/AppState';

const Layout = () => {
	const { state: { user } } = useAppState();

	return (<>
		<div className="Background"></div>

		Logged in as {user.username} <br />
		{user.admin && <span className="admin">Admin</span>}


		<Link to="/">home</Link> <br />
		<Link to="/lesson/test-lesson">test Lessons</Link> <br />
		<Link to="/admin">Admin</Link> <br />



		<div className="tab">
			<Outlet />
		</div>
	</>);
};

export default Layout;