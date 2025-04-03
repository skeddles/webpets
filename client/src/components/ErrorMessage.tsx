import WarningIcon from '../assets/svg/warning.svg?react';

import '../css/ErrorMessage.css';

interface ErrorMessageProps {
	message: string | null;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    const isActive = message ? 'active shake' : '';
    return (
        <div className={`ErrorMessage ${isActive}`}>
            <WarningIcon /> {message}
        </div>
    );
}