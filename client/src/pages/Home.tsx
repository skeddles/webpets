import { Link } from "react-router";

import './Home.css';

interface HomeProps {

}

export default function Home({}: HomeProps) {

	const lessonList:LessonClient[] = [
		{ title: 'Depiction', slug: 'test-lesson', number: 101, description: 'hi', pageId: 'd4a3e186-7814-466c-9e66-284160d6a273', level: 'beginner', course: 'test' },
	];

	return (<div className="Home">
		<h1>Home</h1>
		

		<h2>Your Lessons</h2>
		<div className="lesson-list">
			{lessonList.map((lesson) => (
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