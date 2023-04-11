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
		<div className="min-w-fit">
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
				<div
					className={`${
						showAddItem &&
						'top-0 left-0 block bg-black/[0.5] h-screen w-screen z-[1] content-none overflow-y-hidden'
					}`}
				>
					<div>
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
					<div className="ml-[5%] mr-[5%]">
						<form>
							<label htmlFor="filter" className="text-charcoal text-sm pl-3">
								Filter Items:
							</label>
							<div className="flex flex-row pb-[3%]">
								<div className="bg-medium-gray rounded-full h-10 px-4 flex gap-0 w-[90%]">
									<input
										className="bg-medium-gray w-[90%] placeholder:italic mx-4 text-base w-full outline-none"
										id="filter"
										type="text"
										inputMode="search"
										value={searchedItem}
										onChange={handleChange}
										placeholder="Start typing here..."
										disabled={showAddItem}
									/>
								</div>
								<button
									type="button"
									onClick={buttonClick}
									disabled={searchedItem.length === 0}
									className="flex-auto items-start cursor-pointer hover:text-white bg-white text-black border-[1.5px] border-charcoal rounded-3xl py-1 px-4 ml-3 hover:bg-charcoal"
								>
									Clear
								</button>
							</div>
						</form>
					</div>
					<div className="mb-[15%] max-sm:mb-[30%]">
						<ul>
							{/* sort items by urgency */}
							{!filteredItems.length ? (
								<>
									<p className="pt-2 pl-[8%] text-charcoal text-error-dark">
										{' '}
										No items found
									</p>
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
		</div>
	);
}
