import { useState } from 'react';
import { useAppState } from '../hooks/AppState';

import AccountPanel from './AccountPanel';
import ShoppingCartPanel from './ShoppingCartPanel';

import '../css/RightSidebar.css';
import ShoppingCartIcon from '../assets/svg/cart-shopping.svg?react';

export default function RightSidebar() {
	const { state: { user, shoppingCart } } = useAppState();
	const [openPanel, setOpenPanel] = useState('');

	const sideBarIsOpenClass = openPanel ? " open" : "";

	function togglePanel(panelName:string) {
		if (openPanel === panelName) 
			setOpenPanel('');
		else 
			setOpenPanel(panelName);
	}

	return (<div className={"RightSidebar" + sideBarIsOpenClass}>

		<div className="controls">

			{shoppingCart.length > 0 && 
				<button className="shopping-cart" onClick={()=>togglePanel('cart')}>
					<ShoppingCartIcon />
					<div className="cart-items">{shoppingCart.length}</div>
				</button>
			}

			<button onClick={()=>togglePanel('account')}>
				{user.username}
			</button>
		</div>

		<AccountPanel open={openPanel=='account'}/>
		<ShoppingCartPanel open={openPanel=='cart'}/>
	</div>);
}