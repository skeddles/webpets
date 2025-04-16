import { Outlet } from 'react-router';

import Navigation from './components/Navigation';
import Account from './components/Account';

import './css/App.css';

const Layout = () => {
	return (<div className="App">
		<Navigation />
		<div className="tab"><Outlet /></div>
		<Account />
	</div>);
};

export default Layout;