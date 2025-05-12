import { Outlet, useNavigation } from 'react-router';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const Layout = () => {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (<div className="App">
		<Navigation />
		<div className="tab">
			{isNavigating && <Loading />}
			<Outlet />
		</div>
		<Footer />
	</div>);
};

export default Layout;