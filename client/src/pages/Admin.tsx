import { useEffect, useState } from 'react';
import { useAppState } from '../hooks/AppState';
import { useNavigate } from "react-router";

import ErrorMessage from '../components/ErrorMessage';
import RequestButton from '../components/RequestButton';

// import '../styles/Admin.css';

interface AdminProps {

}

export default function Admin({}: AdminProps) {
	const { state: { user } } = useAppState();
	const navigate = useNavigate();
	const [rebuildError, setRebuildError] = useState('');

	console.log('Admin', user);

	useEffect(() => {
		if (!user) navigate('/');
	});

	if (!user.admin) return null;

	return (<div className="Admin">
		<h1>Admin</h1>

		<RequestButton 
			text="Rebuild Lessons"
			apiPath="admin/lessons/rebuild-all"
			onSuccess={() => alert('Lessons rebuilt successfully')}
			onError={(data) => console.error('Error rebuilding lessons:', data)}
			setErrorMessage={setRebuildError}
			/>
		<ErrorMessage message={rebuildError} />

	</div>);
}