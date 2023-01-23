import './Home.css';

export function Home({ handleNewToken }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page.
			</p>
			<button onClick={handleNewToken}>Create a new list!</button>
		</div>
	);
}
