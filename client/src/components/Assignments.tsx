import { useEffect, useRef, useState } from 'react';
import useApiRequest from '../hooks/ApiRequest';

import '../css/Assignments.css';

const CDN = import.meta.env.VITE_DO_SPACES_CDN_PATH;

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
		ass {lessonSlug} 
		{assignments && assignments.map((assignment) => {
			return (
				<div key={assignment._id} className="Assignment">
					<h2>{assignment.name}</h2>
					<img src={CDN+`/assignments/${assignment.notionId}.png`}/>
					
					<p>Number: {assignment.number}</p>
					<p>Optional: {assignment.optional ? 'Yes' : 'No'}</p>
					<p>Repeatable: {assignment.repeatable ? 'Yes' : 'No'}</p>
					<p>Slug: {assignment.lessonSlug}</p>
				</div>
			);
		})}
		{!assignments && <p>Loading...</p>}
	</div>);
}