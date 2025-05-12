import '../css/Items.css';
import { useLoaderData } from 'react-router';

export default function Items() {
	const {items}:{items:Item[]} = useLoaderData();

	if (!items) return <p>Loading...</p>;

	return (<div className="Items">
		<h1>Your Items</h1>
		<h5>{items.length} items</h5>
		<ul>
			{items.map((item: any) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	</div>);
}