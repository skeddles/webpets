import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router";

import ErrorMessage from '../components/ErrorMessage';
import AuthButton from '../components/AuthButton';

import '../css/Register.css';

interface RegisterProps {

}

export default function Register({}: RegisterProps) {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [validation, setValidation] = useState('Enter a username and password');
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const usernameInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		validateInputs();
	}, [username, password]);

	function registerSuccess({token}: {token: string}) {
		localStorage.setItem('token', token);
		navigate('/');
		window.location.reload();
	}

	function validateInputs () {
		if (!username && !password) return setValidation('Enter a username and password');

		if (!username) return setValidation('Enter a username');
		if (/^[a-zA-Z0-9_]*$/g.test(username) === false) return setValidation('Username must only contain letters, numbers, and underscores');
		if (username.length < 4) return setValidation('Username must be at least 4 characters');
		if (username.length > 32) return setValidation('Username must 32 characters or less');
		
		if (!password) return setValidation('Enter a password');
		if (password.length < 8) return setValidation('Password must be at least 8 characters');
		if (password.length > 1024) return setValidation('Password must be 1024 characters or less');
		
		return setValidation('');
	}

	function setProperErrorMessage (message: string) {
		if (message === "Not Found") 
			setError("Invalid username or password");
		else 
			setError(message);
	}

	function handleKeyDown (e: React.KeyboardEvent) {
		console.log('key down', {
			key: e.key,
			submitButtonRef: submitButtonRef.current,
			validation,
			isUsername: e.target === usernameInputRef.current
		});

		if (!submitButtonRef.current) return;
		if (e.key !== 'Enter') return;

		//if target input is username, focus password
		if (e.target === usernameInputRef.current) 
			return passwordInputRef.current?.focus();

		submitButtonRef.current.click();
	}

	useEffect(() => {
		usernameInputRef.current?.focus();
	},[]);

	return (<div className="Register">
		<h1>Register</h1>

		<input 
			type="text" 
			placeholder="Username..." 
			value={username} 
			onChange={(e) => setUsername(e.target.value)} 
			onKeyDown={handleKeyDown}
			ref={usernameInputRef}
			/>
		<input 
			type="password" 
			placeholder="Password..." 
			value={password} 
			onChange={(e) => setPassword(e.target.value)} 
			onKeyDown={handleKeyDown}
			ref={passwordInputRef}
			/>
		<div className="validation">{validation} &nbsp;</div>
		<ErrorMessage message={error} />
		
		<AuthButton
			text="Create Account"
			authPath="register"
			requestBody={{ username, password }}
			disabled={validation !== ''}
			setErrorMessage={setProperErrorMessage}
			onSuccess={registerSuccess}
			ref={submitButtonRef}
		/>

		<span className="text-link" onClick={() => navigate('/')}>Back</span>
	</div>);
}