
import { Link } from 'react-router';

import '../css/Navigation.css';

export default function Navigation() {

	return (<div className={"Navigation"}>



		<nav>
			<Link to="/">Pets</Link>
			<Link to="/items">Items</Link>
		</nav>


		<Link to="/account">Account</Link>
	</div>);
}