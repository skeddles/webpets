import { useState, useEffect, useRef } from 'react';

import '../css/Dropdown.css';
import ChevronDown from '../assets/svg/chevron-down.svg?react';

interface DropdownProps {
    label: string;
    value: string;
    setValue: any;
    options: string[];
}

export default function Dropdown({ label, value, setValue, options }: DropdownProps) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLButtonElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

	function handleClickOption(option: string) {
		setValue(option);
		setIsOpen(false);
	}

    return (
        <button ref={dropdownRef} className={"Dropdown" + (isOpen ? " open" : "")} onClick={() => setIsOpen(!isOpen)}>
            <div className="selectedValue">{value}</div>
			<div className="button-icon"><ChevronDown/></div>
			<div className="options">
				<h6>{label}:</h6>
				{options.map(option => (
					<div key={option} 
						className={"option" + ((value === option ? " selected" : ""))}
						onClick={() => handleClickOption(option)}
					>
						{option}
					</div>
				))}
			</div>
        </button>
    );
}