import './Home.css';
import { useCallback, useState } from 'react';
import { checkListToken } from '../api/firebase';

export function Home({ handleNewToken, setListToken }) {
	const [token, setToken] = useState('');

	const handleClick = useCallback(() => {
		handleNewToken();
	}, [handleNewToken]);

	const handleFormChange = (e) => {
		const value = e.target.value;
		setToken(value);
	};

	const handleTokenSubmit = async (e) => {
		e.preventDefault();

		const checkTokenExists = await checkListToken(token);

		if (checkTokenExists) {
			setListToken(token);
		} else {
			alert('Could not find this list');
		}
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page.
			</p>
			<button onClick={handleClick}>Create a new list!</button>
			<p> Want to join an existing list? </p>
			<form onSubmit={handleTokenSubmit}>
				<label htmlFor="token"> Enter Token:</label>
				<input
					type="text"
					name="token"
					id="token"
					value={token}
					onChange={handleFormChange}
				/>
				<button type="submit"> Join</button>
			</form>
		</div>
	);
}
