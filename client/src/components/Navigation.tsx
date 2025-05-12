
import { Link } from 'react-router';

import '../css/Navigation.css';

export default function Navigation() {

	return (<div className={"Navigation"}>

		<h1 className="logo">Web Pets</h1>

		<nav>
			<Link to="/">Pets</Link>
			<Link to="/inventory">Inventory</Link>
		</nav>


		<Link to="/account">Account</Link>
	</div>);
}