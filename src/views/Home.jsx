import './Home.css';
import { useCallback, useState } from 'react';
import { checkListToken } from '../api/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import JoinListModal from '../components/JoinListModal';

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

	const closeJoinExistingList = () => {
		setShowJoinList(false);
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
			setlistNotFound('Sorry, could not find this list. Please try again.');

			setTimeout(() => {
				setlistNotFound('');
			}, 3000);
		}
	};

	return (
		<div className="h-screen flex flex-col items-center justify-between relative pt-[5%]">
			<div className="flex flex-col items-center gap-6">
				<img className="w-20" src="../../public/img/limey.png" alt="logo" />
				<h1 className="text-6xl font-logo -my-2">Limey</h1>
				<h2 className="text-2xl font-logo text-center px-5">
					Welcome to your <strong className="text-main-darkest"> smart</strong>{' '}
					shopping list
				</h2>
				<div className="flex flex-col items-center gap-6 mt-6">
					<button
						className="bg-main-darkest text-white border-[1.5px] border-main-darkest rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.4)] py-2 px-12 hover:bg-charcoal hover:border-charcoal"
						onClick={handleCreateNewList}
					>
						Create List
					</button>
					<button
						className="bg-white text-black border-[1.5px] border-black rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.4)] py-2 px-12 hover:bg-medium-gray"
						onClick={handleJoinExistingList}
					>
						Join List
					</button>
				</div>
				{showJoinList &&
					ReactDOM.createPortal(
						<JoinListModal
							handleTokenSubmit={handleTokenSubmit}
							token={token}
							handleFormChange={handleFormChange}
							closeJoinExistingList={closeJoinExistingList}
							listNotFound={listNotFound}
						/>,
						document.getElementById('overlay-root'),
					)}
				<NavLink to="/about" className="text-m font-bold hover:text-main">
					Learn how Limey works &raquo;
				</NavLink>
				{/* {tokenHistory.length ? <p> Here are your previous lists</p> : <></>}
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
				</ul> */}
			</div>
			<div className="bg-[url('/img/fruit-background-horizontal.jpg')] w-full h-[20rem] bg-cover"></div>
		</div>
	);
}
