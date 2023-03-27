import './Home.css';
import { useCallback, useState } from 'react';
import { checkListToken } from '../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom';

export function Home({
	handleNewToken,
	setListToken,
	listToken,
	tokenHistory,
}) {
	const [token, setToken] = useState('');
	const [listNotFound, setlistNotFound] = useState('');
	const [showJoinList, setShowJoinList] = useState(false);
	const redirect = useNavigate();

	// Now that home is navigatable, we don't need to redirect to list if there's a token in local storage.
	// if (listToken) {
	// 	redirect('/list');
	// }

	const handleCreateNewList = useCallback(() => {
		handleNewToken();
		redirect('/list');
	}, [handleNewToken]);

	const handleJoinExistingList = () => {
		setShowJoinList(true);
	};

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
			<div className="logo">
				<h1 className="logo-heading">
					Limey
					<img
						className="logo-image"
						src="../../public/img/limey.png"
						alt="logo"
					/>
				</h1>
			</div>
			<h2>Welcome to your Smart Shopping List</h2>
			<div className="home-buttons">
				<button onClick={handleCreateNewList}>Create List</button>
				<button onClick={handleJoinExistingList}>Join List</button>
			</div>
			{showJoinList && (
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
			)}
			<NavLink to="/about">Learn how to use the Shopping List App</NavLink>
			{tokenHistory.length ? <p> Here are your previous lists</p> : <></>}
			<ul>
				{tokenHistory.reverse().map((token) => {
					return (
						<li key={token.token}>
							<button
								onClick={() => {
									setListToken(token.token);
									redirect('/list');
								}}
							>
								{token.alias
									? token.alias + ' (' + token.token + ')'
									: token.token}
							</button>
						</li>
					);
				})}
			</ul>

			<p>{listNotFound}</p>
		</div>
	);
}
