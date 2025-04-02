import { Outlet } from 'react-router-dom';


const Layout = () => {
	return (<>
		<div className="Background"></div>

		<div className="tab">

			<Outlet />
		</div>
	</>);
};

export default Layout;