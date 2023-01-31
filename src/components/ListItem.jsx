import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';

export function ListItem({ name, data, listToken }) {
	const [itemPurchased, setItemPurchased] = useState('');

	const itemData = {
		id: data.id,
		dateLastPurchased: new Date(),
		totalPurchases: 1,
	};

	const handleSelect = (e) => {
		let isChecked = e.target.checked;

		if (isChecked) {
			setItemPurchased(itemData);
			updateItem(listToken, data.id, itemPurchased);
		}
	};

	return (
		<>
			<li className="ListItem">
				<input
					className="ListItem-checkbox"
					type="checkbox"
					id="listItem"
					value={name}
					checked={itemPurchased}
					onChange={handleSelect}
				/>
				<label htmlFor="listItem" className="ListItem-label">
					{name}
				</label>
			</li>
		</>
	);
}
