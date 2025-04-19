import '../css/Assignment.css';

import Button from './Button';
import CompletedButton from './CompletedButton';
import DownloadIcon from '../assets/svg/download.svg?react';

const CDN = import.meta.env.VITE_DO_SPACES_CDN_PATH;

interface AssignmentProps {
	assignment: Assignment;
	lessonSlug: string;
	completed: boolean;
	setCompletedAssignments: any;
}

export default function Assignment({assignment, lessonSlug, completed, setCompletedAssignments}: AssignmentProps) {


	const assignment_file_url = CDN + '/assignments/' + assignment.notionId + '.png';
	const assignment_file_download_name = lessonSlug + '_assignment_' + assignment.number + '_' + assignment.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_') + '.png';
	
	async function downloadFile(): Promise<void> {
		try {
			const response: Response = await fetch(assignment_file_url);
			if (!response.ok) {
				throw new Error('Failed to fetch the file');
			}
	
			const blob: Blob = await response.blob();
			const link: HTMLAnchorElement = document.createElement('a');
			const objectUrl: string = URL.createObjectURL(blob);
			link.href = objectUrl;
			link.download = assignment_file_download_name;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(objectUrl);
		} catch (error: unknown) {
			console.error('Error downloading the file:', error);
		}
	}

	function completedStateChanged(newCompletionState: boolean) {
		console.log('Assignment completed state changed:', newCompletionState);

		setCompletedAssignments((prevState: string[]) => {
			if (newCompletionState) return [...prevState, assignment._id];
			return prevState.filter((id: string) => id !== assignment._id);
		});
	}

	return (
		<div className="Assignment">
			<h2>Assignment {assignment.number}: {assignment.name}</h2>

			<div className="worksheet">
				<h6>Worksheet:</h6>
				<img src={CDN+`/assignments/${assignment.notionId}.png`}/>

				<Button className="download" size="small" onClick={downloadFile}>
					Download <DownloadIcon />
				</Button>
			</div>
			
			<div className="description" dangerouslySetInnerHTML={{__html: assignment.description}}></div>

			<div className="complete-assignment">
				<p>When you've finished the assignment, mark it as complete!</p>
				<CompletedButton complete={completed} type="assignment" contentId={assignment._id} onSuccess={completedStateChanged}/>
			</div>
		</div>
	);
}
