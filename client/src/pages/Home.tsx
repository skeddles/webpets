import { useState, useEffect } from 'react';
import { Link } from "react-router";
import useApiRequest from '../hooks/ApiRequest';
import { useAppState } from '../hooks/AppState';

import './Home.css';


export default function Home() {
	const { state: { user } } = useAppState();
	const apiRequest = useApiRequest();
	const [lessons, setLessons] = useState<Lesson[]>([]);

	console.log('rendering Home');

	useEffect(() => {
		if (!lessons) return;
		loadLessons();
	}, []);

	async function loadLessons() {
		try {
			const result = await apiRequest('lesson/get-all', {});
			if (!result) throw new Error('failed to fetch lessons');

			setLessons(result.lessons);
			console.log('lessons', result.lessons);
		} catch (error) {
			console.error('Error fetching lessons:', error);
		}
	}

	lessons.forEach((lesson) => {
		console.log('lesson', {
			lesson,
			purchased: user.purchasedLessons.includes(lesson._id),
			id: lesson._id,
			purchasedLessons: user.purchasedLessons,
			user,
		});
	});

	const purchasedLessons = lessons.filter((lesson) => user.purchasedLessons.includes(lesson._id));
	const unpurchasedLessons = lessons.filter((lesson) => !user.purchasedLessons.includes(lesson._id));

	return (<div className="Home">
		<h1>Home</h1>
		
		<h2>Your Lessons</h2>
		<div className="lesson-list">
			{purchasedLessons.map((lesson) => (
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
			{unpurchasedLessons.map((lesson) => (
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



	</div>);
}