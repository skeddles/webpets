import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';

import RequestButton from '../components/RequestButton';
import ErrorMessage from '../components/ErrorMessage';
import Assignments from '../components/Assignments';
import CompletedButton from '../components/CompletedButton';

import '../css/Lesson.css';

interface LessonProps {

}

export default function Lesson({}: LessonProps) {
	const { state: { user } } = useAppState();
	const { slug } = useParams();
	const apiRequest = useApiRequest();
	const location = useLocation();

	const [lesson, setLesson] = useState<Lesson| null>(location.state?.lesson || null);
	const [lessonUrl, setLessonUrl] = useState<string | null>(null);
	const [lessonHtml, setLessonHtml] = useState<string | null>(null);
	const [adminError, setRebuildError] = useState('');

	const [completed, setCompleted] = useState(location.state?.completed || false);

	useEffect(() => {
		if (!slug) return;
		loadLesson();
	}, []);

	useEffect(() => {
		if (lessonUrl) {
			console.log('loading html from', lessonUrl);
			fetchLessonHtml(lessonUrl)
				.then((lessonHtmlText) => {
					setLessonHtml(lessonHtmlText);
					console.log('lessonHtmlText', lessonHtmlText);
				})
				.catch((error) => {
					console.error('Error fetching lesson HTML:', error);
				});
		}
	}, [lessonUrl]);

	async function loadLesson() {
		try {
			let lessonData = lesson;
			if (!lesson) {
				const result = await apiRequest('lesson/get', { slug });
				if (!result) throw new Error('Lesson data is null');
				setLesson(result.lesson);
				setLessonUrl(result.url);
				setCompleted(result.completed);
				console.log('lessonData', lessonData);
			} else if (!lessonUrl) {
				console.log('already have lessonData, fetching url');
				const url = (await apiRequest('lesson/get-url', { pageId: lesson.pageId })).url;
				setLessonUrl(url);
			}
		} catch (error) {
			console.error('Error fetching lesson:', error);
		}
	}

	async function handleLessonRebuiltSuccess() {
		if (!lesson || !lessonUrl) throw new Error('Lesson is null');
		console.log('Lesson rebuilt successfully');
		setLessonHtml(null);
		const lessonHtmlText = await fetchLessonHtml(lessonUrl);
		setLessonHtml(lessonHtmlText);
	}

	async function lessonCompletionStateChanged(newCompletionState: boolean) {
		setCompleted(newCompletionState);
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

		{lesson && <>
			<article>
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
			</article>

			<div className="complete-assignment">
				<p>When you've finished reading, mark this lesson as complete to unlock the assignments!</p>
				<CompletedButton complete={completed} type="lesson" contentId={lesson._id} onSuccess={lessonCompletionStateChanged}/>
			</div>
			
			
			<Assignments lessonSlug={lesson.slug} />
			
		</>}
		
	</div>);
}

async function fetchLessonHtml(url:string) {
	const lessonHtml = await fetch(url);
	if (!lessonHtml.ok) throw new Error('Failed to fetch lesson HTML: ' + lessonHtml.statusText);
	const lessonHtmlText = await lessonHtml.text();
	return lessonHtmlText;
}