import { useEffect } from 'react';
import { useAppState } from '../hooks/AppState';
import { useNavigate } from "react-router-dom";
// import '../styles/Admin.css';

interface AdminProps {

}

export default function Admin({}: AdminProps) {
	const { state: { user } } = useAppState();
	const navigate = useNavigate();

	console.log('Admin', user);

	useEffect(() => {
		if (!user) navigate('/');
	});

	if (!user.admin) return null;

	return (<div className="Admin">
		<h1>Admin</h1>

	</div>);
}