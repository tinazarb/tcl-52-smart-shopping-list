import { ListItem } from '../components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function List({ data, listToken }) {
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

	return (
		<>
			{/* welcome people to add to their list if it's empty */}
			{data.length === 0 ? (
				<div>
					<h1>Hello!</h1>
					<h2>
						You have nothing on your list yet! Click here to add your first
						item:
					</h2>
					<NavLink to="/add-item">Add item page</NavLink>
				</div>
			) : (
				// otherwise show people their list
				<div>
					<h1>Welcome back!</h1>
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
					<ul>
						{/* sort items by urgency */}
						{!filteredItems.length ? (
							<p>It's not here!</p>
						) : (
							filteredItems.map((list) => {
								return (
									<ListItem
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
			)}
		</>
	);
}
