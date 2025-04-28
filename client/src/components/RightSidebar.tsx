import { useState } from 'react';
import { useAppState } from '../hooks/AppState';

import ThemeSelector from './ThemeSelector';

import '../css/RightSidebar.css';
import ShoppingCartIcon from '../assets/svg/cart-shopping.svg?react';

export default function RightSidebar() {
	const { state: { user } } = useAppState();
	const [open, setOpen] = useState(false);

	return (<div className={"RightSidebar" + (open ? " open" : "")}>

		<div className="user-button">

			<button className="shopping-cart">
				<ShoppingCartIcon />
				<div className="cart-items">3</div>
			</button>

			<button onClick={() => setOpen(!open)}>
				{user.username}
			</button>
		</div>

		<div className="content">

			<div>({user.admin && <span className="admin">Admin</span>})</div>
			
			<ThemeSelector />

		</div>

	</div>);
}