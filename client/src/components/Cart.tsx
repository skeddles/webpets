import { useAppState } from '../hooks/AppState';

import '../css/Cart.css';

interface CartProps {

}

export default function Cart({}: CartProps) {
	const { state: { shoppingCart }, dispatchState } = useAppState();

	return (<div className="Cart">
		{shoppingCart.length === 0 && <p>Your cart is empty</p>}



	</div>);
}