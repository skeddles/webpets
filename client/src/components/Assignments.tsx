import { useEffect, useRef, useState } from 'react';
import useApiRequest from '../hooks/ApiRequest';

import Button from './Button';

import '../css/Assignments.css';
import DownloadIcon from '../assets/svg/download.svg?react';

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

	function downloadAssignment(assignmentIndex: number) {
		const assignment = assignments![assignmentIndex];
		const url = CDN + '/assignments/' + assignment.notionId + '.png';
		const filename = lessonSlug + '_assignment_' + assignment.number + '_' + assignment.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_') + '.png';
		downloadFile(url, filename);
	}


	return (<div className="Assignments" ref={AssignmentsRef}>
		<h1>Assignments</h1>
		{assignments && assignments.map((assignment, i) => {
			return (
				<div key={assignment._id} className="assignment">
					<h2>Assignment {assignment.number}: {assignment.name}</h2>

					<div className="worksheet">

						<h6>Worksheet:</h6>

						<img src={CDN+`/assignments/${assignment.notionId}.png`}/>

						<Button className="download" size="small" onClick={()=> downloadAssignment(i)}>
							Download <DownloadIcon />
						</Button>

					</div>
					
					<div className="description" dangerouslySetInnerHTML={{__html: assignment.description}}>

					</div>
				</div>
			);
		})}
		{!assignments && <p>Loading...</p>}
	</div>);
}

async function downloadFile(url: string, filename: string): Promise<void> {
	try {
		const response: Response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch the file');
		}

		const blob: Blob = await response.blob();
		const link: HTMLAnchorElement = document.createElement('a');
		const objectUrl: string = URL.createObjectURL(blob);
		link.href = objectUrl;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(objectUrl);
	} catch (error: unknown) {
		console.error('Error downloading the file:', error);
	}
}