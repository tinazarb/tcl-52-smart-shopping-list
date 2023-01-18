import { addItem } from '../api/firebase';
import { useState } from 'react';
// import { list } from "./List"

export function AddItem({ listToken }) {
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

	//what happens when the form is submitted?
	const [submissionYes, setSubmissionYes] = useState('');

	const submitForm = (e) => {
		e.preventDefault();
		//if they don't put anything in
		if (itemName === '') {
			setSubmissionYes('The item name cannot be blank :|');
			return;
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
							type="text"
							name="itemName"
							value={itemName}
							onChange={handleChangeItem}
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

// TODO lower banner display that disappears on either next submission OR leaving the page
