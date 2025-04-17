import '../css/CompletedButton.css';

import Check from '../assets/svg/check.svg?react';
import Minus from '../assets/svg/minus.svg?react';


interface CompletedButtonProps {
	complete: boolean;
	onClick: () => void;
}

export default function CompletedButton({complete, onClick}: CompletedButtonProps) {
	return (<div className="CompletedButton">
		<button className={complete ? 'completed' : 'incomplete'} onClick={onClick}>
			<div className="text">
				{complete ? 'Completed' : 'Incomplete'}
			</div>

			<div className="icon">
				{complete ? <Check /> : <Minus />}
			</div>
		</button>
	</div>);
}