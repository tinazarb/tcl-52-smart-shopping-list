import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';
import { getDaysBetweenDates } from '../utils';

export function ListItem({ name, data, listToken }) {
	const initialChecked =
		Date.now() - data.dateLastPurchased?.toMillis() < 86400000 || false;

	const [isChecked, setIsChecked] = useState(initialChecked);

	const handleSelect = (e) => {
		let nextChecked = e.target.checked;

		// toggling isChecked based on checkbox state
		setIsChecked(nextChecked);
		if (nextChecked) {
			const nextData = {
				dateLastPurchased: new Date(),
				totalPurchases: data.totalPurchases + 1,
				// dateNextPurchased: new Date() + getDaysBetweenDates
			};

			updateItem(listToken, data.id, nextData);
		}

		const today = new Date();

		// if the item hasn't been purchased, compare today to the date of its creation else compare today to the day it was last purchased.
		const delta =
			data.dateLastPurchased === null
				? getDaysBetweenDates(today.getTime(), data.dateCreated.toMillis())
				: getDaysBetweenDates(
						today.getTime(),
						data.dateLastPurchased.toMillis(),
				  );
		console.log(delta);
	};

	return (
		<>
			<li className="ListItem">
				<input
					className="ListItem-checkbox"
					type="checkbox"
					id="listItem"
					value={name}
					checked={isChecked}
					onChange={handleSelect}
				/>
				<label htmlFor="listItem" className="ListItem-label">
					{name}
				</label>
			</li>
		</>
	);
}
