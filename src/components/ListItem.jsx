import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api';

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
			};

			updateItem(listToken, data.id, nextData);
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
