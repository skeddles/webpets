import { useState } from 'react';
import { useAppState } from '../hooks/AppState';

import AccountPanel from './AccountPanel';

import '../css/RightSidebar.css';
import ShoppingCartIcon from '../assets/svg/cart-shopping.svg?react';



export default function RightSidebar() {
	const { state: { user } } = useAppState();


	const [accountPanelOpen, setAccountPanelOpen] = useState(false);
	const [shoppingCartPanelOpen, setShoppingCartPanelOpen] = useState(false);

	const sideBarIsOpen = accountPanelOpen || shoppingCartPanelOpen;

	return (<div className={"RightSidebar" + (sideBarIsOpen ? " open" : "")}>

		<div className="user-button">

			<button className="shopping-cart" onClick={() => setShoppingCartPanelOpen(!shoppingCartPanelOpen)}>
				<ShoppingCartIcon />
				<div className="cart-items">3</div>
			</button>

			<button onClick={() => setAccountPanelOpen(!accountPanelOpen)}>
				{user.username}
			</button>
		</div>

		<AccountPanel />
	</div>);
}