import { useLoaderData } from "react-router";

export default function PetPage() {
	const pet = useLoaderData() as Pet | null;

	if (!pet) {
		return <div>Pet not found.</div>;
	}

	return (
		<div className="PetPage">
			<h1>{pet.name}</h1>
			<img src="/pet.png" alt={pet.name} style={{ width: '256px', height: '256px' }} />
			<p><strong>Personality:</strong> {pet.personality}</p>
			<p><strong>Born:</strong> {new Date(pet.born).toLocaleDateString()}</p>
		</div>
	);
}
