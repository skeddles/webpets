import React, { useRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
	disabled?: boolean;
	ref?: React.RefObject<HTMLButtonElement | null>;
}

export default function Button({children, disabled, ref, ...rest}: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		if (disabled) return;
		if (rest.onClick) rest.onClick(e);
	}

    return (
        <button
            {...rest}
            ref={ref || buttonRef}
			onClick={handleClick}
			aria-disabled={disabled}
        >
        {children}
        </button>
    );
}