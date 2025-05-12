import { Link } from "react-router";

import '../css/PetsList.css';

interface PetsListProps {
    pets: Pet[];
}

export default function PetsList({pets}: PetsListProps) {

    return (<div className="PetsList">
        {pets.map((pet) => (
            <Link 
                className="pet" 
                to={'/pet/'+pet.slug} 
                key={pet.slug} 
                >	
					<div>{pet.name}</div>
					<img src="/pet.png"/>
            </Link>
        ))}
    </div>);
}