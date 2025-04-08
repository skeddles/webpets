

import './Home.css';

interface HomeProps {

}

export default function Home({}: HomeProps) {

	const lessonList = [
		{ title: 'Lesson 1', slug: 'lesson-1' },
		{ title: 'Lesson 2', slug: 'lesson-2' },
		{ title: 'Lesson 3', slug: 'lesson-3' },
	];

	return (<div className="Home">
		<h1>Home</h1>
		

		<h2>Your Lessons</h2>
		<div className="lesson-list">
			{lessonList.map((lesson) => (
				<div key={lesson.slug} className="lesson">
					<div>{lesson.title}</div>

				</div>
			))}
		</div>

	</div>);
}