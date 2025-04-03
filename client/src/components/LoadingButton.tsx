import { JSX } from 'react';

import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import RightChevronIcon from '../assets/svg/chevron-right.svg?react';

interface LoadingButtonProps {
	text: string;
	loading: boolean;
	onClick: () => void;
	disabled?: boolean;
	sparkle?: boolean;
	icon?: JSX.Element;
	className?: string;
	ref?: React.RefObject<HTMLButtonElement | null>;
}

export default function LoadingButton({text, loading, onClick, disabled, sparkle, icon, className, ref}: LoadingButtonProps) {
	let currentIcon = <RightChevronIcon />;
	if (icon) currentIcon = icon;
	if (loading) currentIcon = <LoadingSpinner />;
	
	let classList = 'loading-button';
	if (className) classList += ' ' + className;
	if (sparkle) classList += ' sparkle';

	return (
		<Button
			onClick={onClick}
			disabled={disabled || loading}
			className={classList}
			ref={ref}
		>
		{text}
	</Button>);
}