import { Outlet } from 'react-router';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Layout = () => {
	return (<div className="App">
		<Navigation />
		<div className="tab"><Outlet /></div>
		<Footer />
	</div>);
};

export default Layout;