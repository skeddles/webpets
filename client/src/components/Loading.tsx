import '../css/Loading.css';

interface LoadingProps {

}

export default function Loading({}: LoadingProps) {

	const text = 'loading';

	return (<div className="Loading">
		<div className="text">
			{text.split('').map((letter, index) => <span key={index}>{letter}</span>)}
		</div>
		<svg viewBox="0 0 200 200">
			<path className="line"
				d="M40,20
					L160,20
					A20 20 0 0 1 180,40
					L180,160
					A20 20 0 0 1 160,180
					L40,180
					A20 20 0 0 1 20,160
					L20,40
					A20 20 0 0 1 40,20"
			/>
		</svg>
	</div>);
}