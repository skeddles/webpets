import { useEffect, useRef, useState } from 'react';
import useApiRequest from '../hooks/ApiRequest';

import Assignment from './Assignment';

import '../css/Assignments.css';

interface AssignmentsProps {
	lessonSlug: string;
}

export default function Assignments({lessonSlug}: AssignmentsProps) {
	const apiRequest = useApiRequest();
	const loadingState = useRef('unloaded');
	const AssignmentsRef = useRef<HTMLDivElement>(null);
	const [assignments, setAssignments] = useState<Assignment[] | null>(null);

	async function loadAssignments() {
		try {
			const result = await apiRequest('assignments/lesson', { slug: lessonSlug });
			if (!result) throw new Error('Assignments data is null');
			setAssignments(result.assignments);
			loadingState.current = 'loaded';
		}
		catch (error) {
			console.error('Error fetching assignments:', error);
			return null;
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			if (loadingState.current !== 'unloaded') return;
			if (!AssignmentsRef.current) return;			
			const rect = AssignmentsRef.current.getBoundingClientRect();
			const top = rect.top + window.scrollY;
			const windowHeight = window.innerHeight;
			if (window.scrollY < top - windowHeight - 400) return;
			loadingState.current = 'loading';
			loadAssignments();
		};
	
		window.addEventListener('scroll', handleScroll);
	
		return () => {window.removeEventListener('scroll', handleScroll);};
	}, []);

	return (<div className="Assignments" ref={AssignmentsRef}>
		<h1>Assignments</h1>
		{assignments && assignments.map((assignment) => <Assignment key={assignment._id} assignment={assignment} lessonSlug={lessonSlug} />)}
		{!assignments && <p>Loading...</p>}
	</div>);
}
