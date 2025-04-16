import { useState } from 'react';
import { Link } from 'react-router';

import '../css/Navigation.css';
import Bars from '../assets/svg/bars.svg?react';
import XMark from '../assets/svg/xmark.svg?react';

export default function Navigation() {
	const [open, setOpen] = useState(false);

	return (<div className={"Navigation" + (open ? " open" : "")}>


		<div className="header">
			<h1>Pixel School</h1>

			<button className="menu-button" onClick={() => setOpen(!open)}>
				{open ? <XMark /> : <Bars />}
			</button>
		</div>

		<div className="content">
			<Link to="/">home</Link> <br />
			<Link to="/lesson/test-lesson">test Lessons</Link> <br />
			<Link to="/admin">Admin</Link> <br />
		</div>
	</div>);
}