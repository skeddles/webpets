import { Link } from "react-router";
import { useAppState } from '../hooks/AppState';

import '../css/LessonList.css';

interface LessonListProps {
	lessons: Lesson[];
}

export default function LessonList({lessons}: LessonListProps) {
	const { state: { completedLessons } } = useAppState();

	return (<div className="LessonList">
		{lessons.map((lesson) => (
			<Link 
				className="lesson" 
				to={'/lesson/'+lesson.slug} 
				key={lesson.slug} 
				state={{ lesson, completed: completedLessons?.includes(lesson._id) }}
				>
					<div>{lesson.title}</div>
					<p>{completedLessons?.includes(lesson._id) ? 'Completed' : 'Not Completed'}</p>
			</Link>
		))}
	</div>);
}