import { addItem } from '../api/firebase';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {
	Box,
	Button,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	TextField,
	Typography,
	createTheme,
	ThemeProvider,
} from '@mui/material';

export function AddItem({ listToken, data, showAddItem, setShowAddItem }) {
	const itemNameRef = useRef(); // ref for the item name field

	useEffect(() => {
		if (showAddItem) {
			itemNameRef.current.focus();
		}
	}, [showAddItem]);

	useEffect(() => {
		const handleKeyEvents = (e) => {
			// close panel if user hits Escape (27)
			if (e.keyCode === 27) setShowAddItem(false);
		};

		if (showAddItem) {
			// when panel opens, add eventListeners and put initial focus on item field
			document.addEventListener('keydown', handleKeyEvents);
		}
		return () => {
			document.removeEventListener('keydown', handleKeyEvents);
		};
	}, [showAddItem, setShowAddItem]);

	const redirect = useNavigate();

	const CustomFontTheme = createTheme({
		typography: {
			fontSize: '1.6rem',
		},
	});

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
	const [isFormInvalid, setIsFormInvalid] = useState(false);

	// Validate Form
	const collectFormErrors = () => {
		// error object
		let errorCollection = {};

		// Validation check if item name field is empty on submit -> inline error if blank
		// Validation check if new list item already exists in DB -> inline error if item already exists
		for (let i = 0; i < existingItems.length; i++) {
			if (itemName === '') {
				errorCollection.itemName = 'Please enter an item';
			} else if (
				itemName
					.replace(/\s+|[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
					.toLowerCase() === existingItems[i]
			) {
				errorCollection.itemName = `${itemName} already exists in your Shopping List`;
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
			return [setFormError(errorCollection), setIsFormInvalid(true)];
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
			setSubmissionYes(`${itemName} added to your list!`);
			setTimeout(() => {
				setSubmissionYes('');
			}, 2000);
		} catch (err) {
			setSubmissionYes('Please try again, something went wrong.');
			setTimeout(() => {
				setSubmissionYes('');
			}, 2000);
		}
	};

	return !showAddItem ? (
		<div className="flex justify-center">
			<button
				onClick={() => setShowAddItem(!showAddItem)}
				aria-label="Open Add Item Form"
				aria-expanded={showAddItem}
			>
				<FontAwesomeIcon
					icon={faPlus}
					className="text-7xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white hover:scale-105 fixed bottom-16"
					transform="shrink-3"
					aria-hidden="true"
					focusable="false"
				/>
			</button>
		</div>
	) : (
		<div className="absolute h-fit w-full h-[85%] bg-charcoal text-white flex flex-col items-center rounded-xl inset-x-0 bottom-0 text-sm z-10 ">
			<button
				onClick={() => setShowAddItem(!showAddItem)}
				aria-label="Close Add Item Form"
				aria-expanded={showAddItem}
			>
				<FontAwesomeIcon
					icon={faPlus}
					className="text-7xl rotate-45 text-6xl aspect-square shadow-[0_4px_4px_rgba(0,0,0,0.5)] bg-main-darkest rounded-full border text-white -mt-8 hover:scale-105"
					transform="shrink-3"
					aria-hidden="true"
					focusable="false"
				/>
			</button>
			<form onSubmit={submitForm} className="flex flex-col items-center">
				<h1 className="text-white p-5 text-2xl">Add a new item </h1>
				<input
					className="bg-light-charcoal text-white rounded-full py-2 pl-3 w-[100%] outline-white mb-[10%]"
					ref={itemNameRef}
					id="addItemInput"
					type="text"
					variant="standard"
					value={itemName}
					error={isFormInvalid}
					helperText={formError.itemName}
					onChange={handleChangeItem}
					required
				/>
				<div className="mb-[10%]">
					<h2 className="text-white text-lg pb-[5%]">
						How soon will you buy this again?
					</h2>
					<RadioGroup defaultValue="soon" className="text-white">
						<FormControlLabel
							id="soon"
							label={<Typography>soon (1 week)</Typography>}
							name="buyAgain"
							control={<Radio />}
							value={soon}
							checked={nextPurchase === soon}
							onChange={handleChange}
						/>
						<FormControlLabel
							id="kindOfSoon"
							label={<Typography>kind of soon (2 weeks)</Typography>}
							name="buyAgain"
							control={<Radio />}
							value={kindOfSoon}
							checked={nextPurchase === kindOfSoon}
							onChange={handleChange}
						/>
						<FormControlLabel
							id="notSoon"
							label={<Typography>not soon (1 month)</Typography>}
							name="buyAgain"
							control={<Radio />}
							value={notSoon}
							checked={nextPurchase === notSoon}
							onChange={handleChange}
						/>
					</RadioGroup>
				</div>
				<button
					type="submit"
					variant="contained"
					className="bg-light-charcoal text-white rounded-3xl py-2 px-12 hover:bg-medium-gray mb-[10%] w-[100%]"
				>
					Add Item
				</button>
			</form>
			{submissionYes}
		</div>
	);
}
