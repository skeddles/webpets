import { useEffect } from 'react';
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';
import PetsList from '../components/PetsList';

import '../css/Home.css';


export default function Home() {
	const { state: { pets } } = useAppState();

	return (<div className="Home">
		<h1>Home</h1>
		
		{pets && <>
			<h2>Your Pets</h2>
			<PetsList pets={pets} />
		</>}

		{!pets && <div className="loading">You don't have any pets yet!</div>}
	</div>);
}