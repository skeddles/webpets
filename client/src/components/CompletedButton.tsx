import { useState } from 'react';
import '../css/CompletedButton.css';

import Check from '../assets/svg/check.svg?react';
import Minus from '../assets/svg/minus.svg?react';


interface CompletedButtonProps {
	complete: boolean;
}

export default function CompletedButton({complete}: CompletedButtonProps) {

	const [tempcheck, setTempCheck] = useState(complete);

	complete = tempcheck;

	return (<div className="CompletedButton">
		<button className={complete ? 'completed' : 'incomplete'} onClick={() => {setTempCheck(!tempcheck);}}>
			<div className="text">
				{complete ? 'Completed' : 'Incomplete'}
			</div>

			<div className="icon">
				{complete ? <Check /> : <Minus />}
			</div>
		</button>
	</div>);
}