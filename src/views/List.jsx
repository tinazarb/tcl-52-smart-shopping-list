import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
	const [searchedItem, setSearchedItem] = useState('');

	function handleChange(e) {
		setSearchedItem(e.target.value);
	}

	const filteredItems = data.filter((item) =>
		item.name.toLowerCase().includes(searchedItem.toLowerCase()),
	);

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
					value={searchedItem}
					onChange={handleChange}
					placeholder="Start Typing here..."
				/>
				<button type="button" onClick={buttonClick}>
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
