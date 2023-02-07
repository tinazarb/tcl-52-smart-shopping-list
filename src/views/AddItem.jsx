// TODO lower banner display that disappears on either next submission OR leaving the page

import { addItem } from '../api/firebase';
import { useState } from 'react';

export function AddItem({ listToken, data }) {
	//itemName behaviour
	const [itemName, setItemName] = useState('');

	const handleChangeItem = (e) => {
		e.preventDefault();
		setItemName(e.target.value);
	};

	//buyNext radio behaviours
	const soon = '7';
	const kindOfSoon = '14';
	const notSoon = '30';

	const [nextPurchase, setNextPurchase] = useState(soon);

	const handleChange = (e) => {
		setNextPurchase(e.target.value);
	};

	// Existing Data DB List Items
	const existingItems = data.map((item) => item.name.toLowerCase());

	//what happens when the form is submitted?
	const [submissionYes, setSubmissionYes] = useState('');

	const submitForm = (e) => {
		e.preventDefault();

		// Checking if new list item already exists in DB, alert if already exists
		for (let i = 0; i < existingItems.length; i++) {
			if (itemName.replace(/\s+/g, '').toLowerCase() === existingItems[i]) {
				alert(`${itemName} already exists in your list`);
				setItemName('');
				return;
			}
		}

		//define itemData
		let itemData = {
			itemName: itemName,
			daysUntilNextPurchase: Number(nextPurchase),
		};

		//add item
		const submission = addItem(listToken, itemData);

		if (submission) {
			setItemName('');
			setNextPurchase(soon);
			setSubmissionYes(`${itemName} is on your list :D`);
		} else {
			setSubmissionYes('Something went wrong, please try again :D');
		}
	};

	return (
		<div>
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="itemName">
						Item Name:
						<input
							id="addItemInput"
							type="text"
							name="itemName"
							value={itemName}
							onChange={handleChangeItem}
							required
						/>
					</label>
				</div>
				<div>
					<fieldset>
						<legend>How soon will you buy this again?</legend>
						<label htmlFor="soon">
							<input
								type="radio"
								id="soon"
								name="buyAgain"
								value={soon}
								checked={nextPurchase === soon}
								onChange={handleChange}
							/>
							Soon
						</label>
						<label htmlFor="kindOfSoon">
							<input
								type="radio"
								id="kindOfSoon"
								name="buyAgain"
								value={kindOfSoon}
								checked={nextPurchase === kindOfSoon}
								onChange={handleChange}
								required="required"
							/>
							Kind Of Soon
						</label>
						<label htmlFor="notSoon">
							<input
								type="radio"
								id="notSoon"
								name="buyAgain"
								value={notSoon}
								checked={nextPurchase === notSoon}
								onChange={handleChange}
							/>
							Not Soon
						</label>
					</fieldset>
				</div>
				<button type="submit">Add Item</button>
			</form>
			<p>{submissionYes}</p>
		</div>
	);
}
