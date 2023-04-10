import './Home.css';

export function Home(props) {
	const { onClick } = props;

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={onClick} className="createListBtn">
				Create a new list
			</button>
		</div>
	);
}
