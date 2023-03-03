import './Home.css';
import { useCallback, useState } from 'react';
import { checkListToken } from '../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom';

export function Home({ handleNewToken, setListToken, listToken }) {
	const [token, setToken] = useState('');
	const [listNotFound, setlistNotFound] = useState('');
	const redirect = useNavigate();

	if (listToken) {
		redirect('/list');
	}

	const handleClick = useCallback(() => {
		handleNewToken();
	}, [handleNewToken]);

	const handleFormChange = (e) => {
		const value = e.target.value;
		setToken(value);
	};

	const handleTokenSubmit = async (e) => {
		e.preventDefault();
		const caseSensitiveToken = token.toLowerCase();
		const checkTokenExists = await checkListToken(caseSensitiveToken);

		if (checkTokenExists) {
			setListToken(caseSensitiveToken);
			redirect('/list');
		} else {
			setlistNotFound('Could not find this list');
		}
	};

	return (
		<div className="Home">
			<NavLink to="/about">Learn how to use your smart shopping app</NavLink>
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
					required
					aria-describedby="token-desc"
				/>
				<button type="submit"> Join</button>
				<div id="token-desc">
					A token is three space-separated words, like{' '}
					<code>my list token</code>
				</div>
			</form>
			<p>{listNotFound}</p>
		</div>
	);
}
