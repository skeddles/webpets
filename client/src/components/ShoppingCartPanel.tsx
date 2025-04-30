import { useState } from 'react';
import { useAppState } from '../hooks/AppState';

import RequestButton from './RequestButton';
import ErrorMessage from './ErrorMessage';

import '../css/ShoppingCartPanel.css';
import ChevronRightIcon from '../assets/svg/chevron-right.svg?react';

interface CartProps {
	open: boolean;
}

export default function ShoppingCartPanel({open}: CartProps) {
	const { state: { shoppingCart }, dispatchState } = useAppState();
	const [checkoutErrorMessage, setCheckoutErrorMessage] = useState('');

	let contentClass = "content";
	if (open) contentClass += " open";

	return (<div className="ShoppingCartPanel">
		<div className={contentClass}>

			<h2>Your Cart</h2>

			{shoppingCart.length === 0 && <p>Your cart is empty</p>}

			{shoppingCart.length > 0 && <>
			
				{shoppingCart.map((product) => (
					<div key={product.id} className="cart-item">
						<img src={`https://via.placeholder.com/150?text=${product.id}`} alt={product.id} />
						<div className="cart-item-details">
							<h3>{product.id}</h3>
							<p>Price: ${product.price / 100}</p>
						</div>
					</div>
				))}
			
				<RequestButton
					text="Checkout"
					icon={<ChevronRightIcon />}
					apiPath="shop/checkout"
					requestBody={{ shoppingCart }}
					onSuccess={(data) => {
						console.log('Checkout success:', data);
					}}
					setErrorMessage={setCheckoutErrorMessage}
				/>
				<ErrorMessage message={checkoutErrorMessage} />
			</>}



		</div>
	</div>);
}