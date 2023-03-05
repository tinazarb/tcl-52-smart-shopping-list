import './List.css';
import { ListItems } from '../components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faClipboard } from '@fortawesome/free-solid-svg-icons';

export function List({ data, listToken, tokenHistory }) {
	//set state
	const [searchedItem, setSearchedItem] = useState('');
	//filtering items searched
	const filteredItems = data.filter((item) =>
		item.name.toLowerCase().includes(searchedItem.toLowerCase()),
	);
	//setting where to get searched item value
	function handleChange(e) {
		setSearchedItem(e.target.value);
	}
	//telling the button to clear the search field
	function buttonClick(e) {
		setSearchedItem('');
	}

	const copyTokenToClipboard = () => {
		navigator.clipboard.writeText(listToken);
		alert('Token copied to clipboard!');
	};

	const currentList = listToken;

	return (
		<>
			{/* welcome people to add to their list if it's empty */}
			{data.length === 0 ? (
				<div>
					<h4>
						<span>Sharing Token: {currentList}</span>
						<FontAwesomeIcon
							icon={faClipboard}
							style={{ cursor: 'pointer', marginLeft: '10px' }}
							onClick={copyTokenToClipboard}
						/>
					</h4>

					<h2>
						You have nothing on your list yet! Click below to add your first
						item:
					</h2>
					<button>
						<NavLink className="link" to="/add-item" id="add-item-from-list">
							Add Item
						</NavLink>
					</button>
					<div className="list-icon">
						<div className="list-icon-container">
							<img
								src="../../public/img/robot-wink.png"
								alt="robot winking"
								id="list-robot-img"
							/>
						</div>
					</div>
				</div>
			) : (
				// otherwise show people their by collection name
				<div>
					{/* <h1>Welcome back!</h1> */}
					<h4>
						<span>Sharing Token: {currentList}</span>
						<FontAwesomeIcon
							icon={faClipboard}
							style={{ cursor: 'pointer', marginLeft: '10px' }}
							onClick={copyTokenToClipboard}
						/>
					</h4>


					<div className="search-container">
						<form>
							<label htmlFor="filter">Filter Items:</label>
							<input
								id="filter"
								type="text"
								inputMode="search"
								value={searchedItem}
								onChange={handleChange}
								placeholder="Start Typing here..."
							/>
							<button
								type="button"
								onClick={buttonClick}
								disabled={searchedItem.length === 0}
								className="clearButton"
							>
								Clear
							</button>
						</form>
					</div>
					<div className="shopping-list">
						<ul>
							{/* sort items by urgency */}
							{!filteredItems.length ? (
								<>
									<p>{searchedItem} is not on your Shopping List</p>
									<div className="list-icon">
										<div className="list-icon-container">
											<img
												src="../../public/img/robot-mad.png"
												alt="upset robot with steam coming out of ears"
												id="list-robot-img"
											/>
										</div>
									</div>
								</>
							) : (
								filteredItems.map((list) => {
									return (
										<ListItems
											name={list.name}
											key={list.id}
											data={list}
											listToken={listToken}
										/>
									);
								})
							)}
						</ul>
					</div>
				</div>
			)}
		</>
	);
}
