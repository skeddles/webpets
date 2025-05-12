import { Outlet } from 'react-router';

import Navigation from '../components/Navigation';
import RightSidebar from '../components/RightSidebar';

const Layout = () => {
	return (<div className="App">
		<Navigation />
		<div className="tab"><Outlet /></div>
		<RightSidebar />
	</div>);
};

export default Layout;