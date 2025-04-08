import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useApiRequest from '../hooks/ApiRequest';

import '../css/Article.css';

interface LessonProps {

}

export default function Lesson({}: LessonProps) {
	const { slug } = useParams();
	const apiRequest = useApiRequest();

	const [lesson, setLesson] = useState<LessonClient | null>(null);
	const [lessonHtml, setLessonHtml] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;
		//iife
		(async () => {
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
		})();
	}, []);

	return (<div className="Article">
		
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