import { useAppState } from '../hooks/AppState';

import '../css/ShoppingCartPanel.css';

interface CartProps {
	open: boolean;
}

export default function ShoppingCartPanel({open}: CartProps) {
	const { state: { shoppingCart }, dispatchState } = useAppState();

	let contentClass = "content";
	if (open) contentClass += " open";

	return (<div className="ShoppingCartPanel">
		<div className={contentClass}>

			<h2>Your Cart</h2>

			{shoppingCart.length === 0 && <p>Your cart is empty</p>}


			{shoppingCart.map((product) => (
				<div key={product.id} className="cart-item">
					<img src={`https://via.placeholder.com/150?text=${product.id}`} alt={product.id} />
					<div className="cart-item-details">
						<h3>{product.id}</h3>
						<p>Price: ${product.price / 100}</p>
						<p>Quantity: {product.quantity}</p>
					</div>
				</div>
			))}
		</div>
	</div>);
}