import { useEffect } from 'react';
import { Link } from "react-router";
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';

import '../css/Home.css';


export default function Home() {
	const { state: { user, lessons}, dispatchState } = useAppState();
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

	// lessons.forEach((lesson) => {
	// 	console.log('lesson', {
	// 		lesson,
	// 		purchased: user.purchasedLessons.includes(lesson._id),
	// 		id: lesson._id,
	// 		purchasedLessons: user.purchasedLessons,
	// 		user,
	// 	});
	// });

	return (<div className="Home">
		<h1>Home</h1>
		
		{lessons && <>
			<h2>Your Lessons</h2>
			<div className="lesson-list">
				{lessons
					.filter((lesson) => user.purchasedLessons.includes(lesson._id))
					.map((lesson) => (
						<Link 
							className="lesson" 
							to={'/lesson/'+lesson.slug} 
							key={lesson.slug} 
							state={{ lesson }}
							>
								<div>{lesson.title}</div>

						</Link>
				))}
			</div>

			<h2>Shop</h2>
			<div className="lesson-list">
				{lessons
					.filter((lesson) => !user.purchasedLessons.includes(lesson._id))
					.map((lesson) => (
						<Link 
							className="lesson" 
							to={'/lesson/'+lesson.slug} 
							key={lesson.slug} 
							state={{ lesson }}
							>
								<div>{lesson.title}</div>

						</Link>
				))}
			</div>

		</>}
		{!lessons && <div className="loading">Loading...</div>}
	</div>);
}