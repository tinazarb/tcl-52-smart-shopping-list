// TODO lower banner display that disappears on either next submission OR leaving the page
import './AddItem.css';
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

	//Next Purchase - Soon, Kind of Soon, Not Soon
	const [nextPurchase, setNextPurchase] = useState(soon);

	const handleChange = (e) => {
		setNextPurchase(e.target.value);
	};

	// Existing Data DB List Items
	const existingItems = data.map((item) => item.name.toLowerCase());

	//what happens when the form is submitted?
	const [submissionYes, setSubmissionYes] = useState('');

	//Error handling state
	const [formError, setFormError] = useState({});

	// Validate Form
	const collectFormErrors = () => {
		// error object
		let errorCollection = {};

		// Validation check if item name field is empty on submit -> inline error if blank
		// Validation check if new list item already exists in DB -> inline error if item already exists
		for (let i = 0; i < existingItems.length; i++) {
			if (itemName === '') {
				errorCollection.itemName = 'Please enter a list item';
			} else if (
				itemName
					.replace(/\s+|[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
					.toLowerCase() === existingItems[i]
			) {
				errorCollection.itemName = `${itemName} already exists in your list`;
			}
		}

		// return error object containing error
		return errorCollection;
	};

	const submitForm = async (e) => {
		e.preventDefault();
		// Check if form has an input field error -> error exists if object key exists in errorCollection object
		const errorCollection = collectFormErrors();
		const hasErrors = Object.keys(errorCollection).length > 0;

		// If a client side error exists, set error object to state
		if (hasErrors) {
			return setFormError(errorCollection);
		}

		//add item
		const itemData = {
			itemName: itemName,
			daysUntilNextPurchase: Number(nextPurchase),
		};
		// try catch block to capture any network / server related errors
		try {
			await addItem(listToken, itemData);
			setItemName('');
			setNextPurchase(soon);
			setSubmissionYes(`${itemName} is on your list :D`);
		} catch (err) {
			setSubmissionYes('Please try again, something went wrong :D');
		}
	};

	return (
		<div>
			<form onSubmit={submitForm}>
				<div>
					<label htmlFor="itemName">Item Name:</label>
					<input
						id="addItemInput"
						type="text"
						name="itemName"
						value={itemName}
						onChange={handleChangeItem}
					/>
					<div className="error-message">{formError.itemName}</div>
				</div>
				<div>
					<fieldset>
						<legend>How soon will you buy this again?</legend>
						<input
							type="radio"
							id="soon"
							name="buyAgain"
							value={soon}
							checked={nextPurchase === soon}
							onChange={handleChange}
						/>
						<label htmlFor="soon">Soon</label>
						<input
							type="radio"
							id="kindOfSoon"
							name="buyAgain"
							value={kindOfSoon}
							checked={nextPurchase === kindOfSoon}
							onChange={handleChange}
							required="required"
						/>
						<label htmlFor="kindOfSoon">Kind Of Soon</label>
						<input
							type="radio"
							id="notSoon"
							name="buyAgain"
							value={notSoon}
							checked={nextPurchase === notSoon}
							onChange={handleChange}
						/>
						<label htmlFor="notSoon">Not Soon</label>
					</fieldset>
				</div>
				<button type="submit">Add Item</button>
			</form>
			<p>{submissionYes}</p>
		</div>
	);
}
