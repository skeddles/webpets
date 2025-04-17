import { useRef, useState } from 'react';

import '../css/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
	disabled?: boolean;
	ref?: React.RefObject<HTMLButtonElement | null>;
	secondary?: true;
	size?: 'small' | null;
}

export default function Button({children, disabled, ref, secondary, size, ...rest}: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
	const [shake, setShake] = useState(false);

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		if (disabled) {
			e.preventDefault();
			setShake(true);
			setTimeout(() => setShake(false), 1000);
			return;
		}
		if (rest.onClick) rest.onClick(e);
	}

	let className = 'Button';
	if (secondary) className += ' secondary';
	if (size) className += ' ' + size;

    return (<div className={className}>
        <button
            {...rest}
            ref={ref || buttonRef}
			onClick={handleClick}
			aria-disabled={disabled}
			className={shake ? 'shake' : ''}
        >
        {children}
        </button>
    </div>);
}