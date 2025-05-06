import { useEffect } from 'react';
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';
import LessonList from '../components/LessonList';

import '../css/Home.css';


export default function Home() {
	const { state: { user, lessons }, dispatchState } = useAppState();
	const apiRequest = useApiRequest();

	console.log('rendering Home');

	useEffect(() => {
		if (lessons) return;
		loadLessons();
	}, []);

	async function loadLessons() {
		try {
			const {lessons, completedLessons} = await apiRequest('lesson/get-all', {});

			dispatchState({ type: 'SET_LESSONS', lessons, completedLessons });
			console.log('lessons', { lessons, completedLessons });
		} catch (error) {
			console.error('Error fetching lessons:', error);
		}
	}

	return (<div className="Home">
		<h1>Home</h1>
		
		{lessons && <>
			<h2>Your Lessons</h2>
			<LessonList lessons={lessons.filter((lesson) => user.purchasedLessons.includes(lesson._id))} />

			<h2>Shop</h2>
			<LessonList lessons={lessons.filter((lesson) => !user.purchasedLessons.includes(lesson._id))} />
		</>}
		{!lessons && <div className="loading">Loading...</div>}
	</div>);
}