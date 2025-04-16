import { Outlet, Link } from 'react-router';

import Account from './components/Account';
import './css/App.css';

const Layout = () => {
	

	return (<div className="App">

		<div className="navigation">
			<Link to="/">home</Link> <br />
			<Link to="/lesson/test-lesson">test Lessons</Link> <br />
			<Link to="/admin">Admin</Link> <br />
		</div>

		<div className="tab">
			<Outlet />
		</div>

		<Account/>
	</div>);
};

export default Layout;