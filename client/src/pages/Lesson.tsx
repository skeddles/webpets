import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';

import RequestButton from '../components/RequestButton';
import ErrorMessage from '../components/ErrorMessage';

import '../css/Lesson.css';

interface LessonProps {

}

export default function Lesson({}: LessonProps) {
	const { state: { user } } = useAppState();
	const { slug } = useParams();
	const apiRequest = useApiRequest();
	const location = useLocation();;

	const [lesson, setLesson] = useState<LessonClient | null>(location.state?.lesson || null);
	const [lessonHtml, setLessonHtml] = useState<string | null>(null);
	const [adminError, setRebuildError] = useState('');

	useEffect(() => {
		if (!slug) return;
		loadLesson();
	}, []);

	async function loadLesson() {
		try {
			let lessonData = lesson;
			if (lessonData === null) {
				lessonData = await apiRequest('lesson/get', { slug });
				if (!lessonData) throw new Error('Lesson data is null');
				setLesson(lessonData);
				console.log('lessonData', lessonData);
			}
			else if (lessonData.url === undefined) {
				console.log('already have lessonData, fetching url');
				lessonData.url = (await apiRequest('lesson/get-url', { pageId: lessonData.pageId })).url;
				setLesson(lessonData);
			}
			if (!lessonData.url) throw new Error('Lesson URL is null');
			
			const lessonHtmlText = await fetchLessonHtml(lessonData.url);
			setLessonHtml(lessonHtmlText);
			console.log('lessonHtmlText', lessonHtmlText);

		} catch (error) {
			console.error('Error fetching lesson:', error);
		}
	}


	async function handleLessonRebuiltSuccess() {
		if (!lesson || !lesson.url) throw new Error('Lesson is null');
		console.log('Lesson rebuilt successfully');
		setLessonHtml(null);
		const lessonHtmlText = await fetchLessonHtml(lesson.url);
		setLessonHtml(lessonHtmlText);
	}

	return (<div className="Lesson">
		
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

		{lesson && <article>
			<header>
				<h1>{lesson.title} <span>{lesson.number}</span></h1>
				<div className="sub-header">
					{lesson.level} level
					{lesson.course}
				</div>
				<p>{lesson.description}</p>
			</header>

			<hr />

			{!lessonHtml && <div className="loading">Loading lesson HTML...</div>}
			{lessonHtml && <div className="lesson-html" dangerouslySetInnerHTML={{ __html: lessonHtml }} />}
			
		</article>}
	</div>);
}

async function fetchLessonHtml(url:string) {
	const lessonHtml = await fetch(url);
	if (!lessonHtml.ok) throw new Error('Failed to fetch lesson HTML: ' + lessonHtml.statusText);
	const lessonHtmlText = await lessonHtml.text();
	return lessonHtmlText;
}