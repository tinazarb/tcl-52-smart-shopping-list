// TODO lower banner display that disappears on either next submission OR leaving the page
import { addItem } from '../api/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';

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

export function AddItem({ listToken, data }) {
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
			setSubmissionYes(`${itemName} successfully added to list!`);
		} catch (err) {
			setSubmissionYes('Please try again, something went wrong :D');
		}
	};

	const primaryTypographyProps = {
		style: {
			fontFamily:
				"'Manrope', sans-serif, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif",
			fontWeight: '600',
			fontSize: '1.6rem',
			lineHeight: '1.4',
			color: 'var(--color-aqua-blue)',
			paddingTop: '.8rem',
		},
	};

	const secondaryTypographyProps = {
		style: {
			fontFamily:
				"'Manrope', sans-serif, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif",
			fontWeight: '600',
			fontSize: '1.3rem',
			lineHeight: '1.4',
			color: 'var(--color-aqua-blue)',
		},
	};

	return (
		<div className="Add-item">
			{!submissionYes ? (
				<Box
					sx={{
						width: '100%',
						height: 'auto',
						border: '.05rem solid #2c7d8c',
						padding: '2rem',
					}}
				>
					<FormControl onSubmit={submitForm} component="form" fullWidth>
						<FormLabel>
							<Typography {...primaryTypographyProps}>
								Add Item to Shopping List
							</Typography>
						</FormLabel>
						<ThemeProvider theme={CustomFontTheme}>
							<TextField
								id="addItemInput"
								type="text"
								label="Item Name"
								variant="standard"
								value={itemName}
								sx={{ fontSize: '1.6rem' }}
								error={isFormInvalid}
								helperText={formError.itemName}
								onChange={handleChangeItem}
							/>
						</ThemeProvider>
						<div>
							<FormLabel>
								<Typography {...primaryTypographyProps}>
									How soon will you buy this again?
								</Typography>
							</FormLabel>
							<RadioGroup defaultValue="soon" name="radio-buttons-group">
								<FormControlLabel
									id="soon"
									label={
										<Typography {...secondaryTypographyProps}>
											1 Week
										</Typography>
									}
									name="buyAgain"
									control={<Radio />}
									value={soon}
									checked={nextPurchase === soon}
									onChange={handleChange}
								/>
								<FormControlLabel
									id="kindOfSoon"
									label={
										<Typography {...secondaryTypographyProps}>
											2 Weeks
										</Typography>
									}
									name="buyAgain"
									control={<Radio />}
									value={kindOfSoon}
									checked={nextPurchase === kindOfSoon}
									onChange={handleChange}
								/>
								<FormControlLabel
									id="notSoon"
									label={
										<Typography {...secondaryTypographyProps}>
											1 Month
										</Typography>
									}
									name="buyAgain"
									control={<Radio />}
									value={notSoon}
									checked={nextPurchase === notSoon}
									onChange={handleChange}
								/>
							</RadioGroup>
						</div>
						<Button
							type="submit"
							variant="contained"
							sx={{ backgroundColor: '#0048AD' }}
						>
							Add Item
						</Button>
					</FormControl>
				</Box>
			) : (
				<div className="add-item-success">
					<p>{submissionYes}</p>
					<div className="add-icon">
						<div className="add-icon-container">
							<img
								src="../../public/img/robot-success.png"
								alt="robot hands on hips triumphant"
								id="add-robot-img"
							/>
						</div>
					</div>
					<button
						onClick={() => {
							setSubmissionYes('');
							setFormError({});
							setIsFormInvalid(false);
						}}
					>
						Add Another Item
					</button>
					<button
						onClick={() => {
							redirect('/list');
						}}
					>
						Return to List
					</button>
				</div>
			)}
		</div>
	);
}
