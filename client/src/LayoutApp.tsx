import { Outlet } from 'react-router-dom';
import { useAppState } from './hooks/AppState';

const Layout = () => {
	const { state: { user } } = useAppState();

	return (<>
		<div className="Background"></div>

		Logged in as {user.username} <br />

		<div className="tab">

			<Outlet />
		</div>
	</>);
};

export default Layout;