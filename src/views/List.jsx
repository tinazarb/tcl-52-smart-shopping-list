import { ListItems } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListHeader } from '../components/ListHeader';

import { AddItem } from './AddItem';

export function List({ data, listToken, tokenHistory }) {
	const [searchedItem, setSearchedItem] = useState('');
	const [showAddItem, setShowAddItem] = useState(false);

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

	let navigate = useNavigate();
	const directAboutPage = () => {
		let path = `/about`;
		navigate(path);
	};

	return (
		<>
			{/* welcome people to add to their list if it's empty */}
			{data.length === 0 ? (
				<div
					className={`${
						showAddItem &&
						'top-0 left-0 block bg-black/[0.5] h-screen w-screen z-[1]content-none'
					}`}
				>
					<ListHeader listToken={listToken} showAddItem={showAddItem} />
					<h2 className="text-center text-lg">
						Your shopping list is currently empty.
					</h2>
					<div className="flex justify-center items-center gap-2 mt-1">
						<button
							className={`text-sm font-bold ${
								!showAddItem && 'hover:text-main'
							}`}
							disabled={showAddItem}
							onClick={() => setShowAddItem(true)}
						>
							Add your first item
						</button>
						<div>|</div>
						<button
							className={`text-sm font-bold ${
								!showAddItem && 'hover:text-main'
							}`}
							disabled={showAddItem}
							onClick={directAboutPage}
						>
							Learn how Limey works &raquo;
						</button>
					</div>
				</div>
			) : (
				// otherwise show people their by collection name
				<div>
					<div
						className={`${
							showAddItem &&
							'top-0 left-0 block bg-black/[0.5] h-screen w-screen z-[1]content-none'
						}`}
					>
						<ListHeader listToken={listToken} showAddItem={showAddItem} />
						<h2 className="text-center text-lg">
							You have
							<strong className="text-main-dark">
								{data.length === 1 ? ' 1 item ' : ` ${data.length} items `}
							</strong>
							on your shopping list
						</h2>
						<div className="flex justify-center items-center gap-2 mt-1">
							<button
								className={`text-sm font-bold ${
									!showAddItem && 'hover:text-main'
								}`}
								disabled={showAddItem}
								onClick={() => setShowAddItem(true)}
							>
								Add more items
							</button>
							<div>|</div>
							<button
								className={`text-sm font-bold ${
									!showAddItem && 'hover:text-main'
								}`}
								disabled={showAddItem}
								onClick={directAboutPage}
							>
								Learn how Limey works &raquo;
							</button>
						</div>
					</div>
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
			<AddItem
				listToken={listToken}
				data={data}
				showAddItem={showAddItem}
				setShowAddItem={setShowAddItem}
			/>
		</>
	);
}
