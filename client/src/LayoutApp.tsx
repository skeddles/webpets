import { Outlet } from 'react-router';
import { useAppState } from './hooks/AppState';

const Layout = () => {
	const { state: { user } } = useAppState();

	return (<>
		<div className="Background"></div>

		Logged in as {user.username} <br />
		{user.admin && <span className="admin">Admin</span>}

		<a href="/lesson/test-lesson">Test Lesson</a> <br />
		<a href="/admin">admin</a> <br />


		<div className="tab">
			<Outlet />
		</div>
	</>);
};

export default Layout;