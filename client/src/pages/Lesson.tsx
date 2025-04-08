import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';

import RequestButton from '../components/RequestButton';
import ErrorMessage from '../components/ErrorMessage';
import '../css/Article.css';

interface LessonProps {

}

export default function Lesson({}: LessonProps) {
	const { state: { user } } = useAppState();
	const { slug } = useParams();
	const apiRequest = useApiRequest();

	const [lesson, setLesson] = useState<LessonClient | null>(null);
	const [lessonHtml, setLessonHtml] = useState<string | null>(null);
	const [adminError, setRebuildError] = useState('');

	useEffect(() => {
		if (!slug) return;
		getLessonHtml();
	}, []);

	async function getLessonHtml () {
		try {
			const {lesson}:{lesson:LessonClient} = await apiRequest('lesson/get', { slug });
			setLesson(lesson);
			console.log('lessonData', lesson);

			const lessonHtmlText = await fetchLessonHtml(lesson.url);
			setLessonHtml(lessonHtmlText);
			console.log('lessonHtmlText', lessonHtmlText);

		} catch (error) {
			console.error('Error fetching lesson:', error);
		}
	}

	function handleLessonRebuiltSuccess() {
		console.log('Lesson rebuilt successfully');
		setLessonHtml(null);
		getLessonHtml();
	}

	return (<div className="Article">
		
		{user.admin && <div className="admin-controls">
			<RequestButton 
				text="Rebuild"
				apiPath="admin/lessons/rebuild"
				requestBody={{ slug }}
				onSuccess={handleLessonRebuiltSuccess}
				onError={(data) => console.error('Error rebuilding lessons:', data)}
				setErrorMessage={setRebuildError}
				/>
			<ErrorMessage message={adminError} />
		</div>}

		{!lesson && <div className="loading">Loading...</div>}

		{lesson && <>
			<h1>{lesson.title}</h1>
			<p>{lesson.description}</p>

			<p>Level: {lesson.level}</p>
			<p>Number: {lesson.number}</p>
			<p>Slug: {lesson.slug}</p>
			<p>Page ID: {lesson.pageId}</p>

			{lessonHtml && <div className="lesson-html" dangerouslySetInnerHTML={{ __html: lessonHtml }} />}
			{!lessonHtml && <div className="loading">Loading lesson HTML...</div>}

		</>}
	</div>);
}

async function fetchLessonHtml(url:string) {
	const lessonHtml = await fetch(url);
	if (!lessonHtml.ok) throw new Error('Failed to fetch lesson HTML: ' + lessonHtml.statusText);
	const lessonHtmlText = await lessonHtml.text();
	return lessonHtmlText;
}