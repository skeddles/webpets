import { useState, useEffect } from 'react';
import { Link } from "react-router";
import useApiRequest from '../hooks/ApiRequest';

import './Home.css';

export default function Home() {
	const apiRequest = useApiRequest();
	const [lessons, setLessons] = useState<LessonClient[]>([]);

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

	return (<div className="Home">
		<h1>Home</h1>
		

		<h2>Your Lessons</h2>
		<div className="lesson-list">
			{lessons.map((lesson) => (
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