import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';

export function ListItem({ name, data, listToken }) {
	const [isChecked, setIsChecked] = useState(false);

	const itemData = {
		id: data.id,
		dateLastPurchased: new Date(),
		totalPurchases: data.totalPurchases + 1,
	};

	const handleSelect = (e) => {
		let nextChecked = e.target.checked;

		// toggling isChecked based on checkbox state
		setIsChecked(nextChecked);
		if (nextChecked) {
			updateItem(listToken, data.id, itemData);
		}
	};

	console.log(isChecked, 'itemPurchased');

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
