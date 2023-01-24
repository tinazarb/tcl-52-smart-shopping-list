import './Home.css';

export function Home({ handleNewToken }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page.
			</p>
			<button onClick={handleNewToken}>Create a new list!</button>
			<p> Want to join an existing list? </p>
			<form>
				<label htmlFor="token"> Enter Token:</label>
				<input type="text" name="token" id="token"></input>
				<button type="submit"> Join</button>
			</form>
		</div>
	);
}
