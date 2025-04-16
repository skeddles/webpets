import { Link } from 'react-router';

import '../css/Navigation.css';

export default function Navigation() {
	return (<div className="Navigation">
		<Link to="/">home</Link> <br />
		<Link to="/lesson/test-lesson">test Lessons</Link> <br />
		<Link to="/admin">Admin</Link> <br />
	</div>);
}