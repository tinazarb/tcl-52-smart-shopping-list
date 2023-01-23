import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
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
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<form>
				<label htmlFor="filter">Filter Items:</label>
				<input
					id="filter"
					type="text"
					inputmode="search"
					value={searchedItem}
					onChange={handleChange}
					placeholder="Start Typing here..."
				/>
				<button
					type="button"
					onClick={buttonClick}
					disabled={searchedItem.length === 0}
				>
					Clear
				</button>
			</form>
			<ul>
				{!filteredItems.length ? (
					<p>It's not here!</p>
				) : (
					filteredItems.map((list) => {
						return <ListItem name={list.name} key={list.id} />;
					})
				)}
			</ul>
		</>
	);
}
