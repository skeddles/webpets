import { Link } from "react-router";

import './Home.css';

interface HomeProps {

}

export default function Home({}: HomeProps) {

	const lessonList = [
		{ title: 'Lesson 1', slug: 'test-lesson' },
		{ title: 'Lesson 2', slug: 'lesson-2' },
		{ title: 'Lesson 3', slug: 'lesson-3' },
		{ title: 'Lesson 3', slug: 'lesson-3' },
		{ title: 'Lesson 3', slug: 'lesson-3' },
		{ title: 'Lesson 3', slug: 'lesson-3' },
		{ title: 'Lesson 3', slug: 'lesson-3' },
	];

	return (<div className="Home">
		<h1>Home</h1>
		

		<h2>Your Lessons</h2>
		<div className="lesson-list">
			{lessonList.map((lesson) => (
				<Link to={'/lesson/'+lesson.slug} key={lesson.slug} className="lesson" >
					<div>{lesson.title}</div>

				</Link>
			))}
		</div>

	</div>);
}