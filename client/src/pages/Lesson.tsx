import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import '../css/Article.css';

interface LessonProps {

}

export default function Lesson({}: LessonProps) {
	const { slug } = useParams();

	const [lesson, setLesson] = useState<Lesson | null>(null);


	

	return (<div className="Article">
		{slug}
	</div>);
}