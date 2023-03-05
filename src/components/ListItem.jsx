import './ListItem.css';
import { useState } from 'react';
import { updateItem, deleteItem } from '../api';
import { getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

import {
	Checkbox,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function ListItems({ name, data, listToken }) {
	const initialChecked =
		Date.now() - data.dateLastPurchased?.toMillis() < 86400000 || false;

	const [isChecked, setIsChecked] = useState(initialChecked);

	const handleSelect = (e) => {
		let nextChecked = e.target.checked;

		// toggling isChecked based on checkbox state
		setIsChecked(nextChecked);
		if (nextChecked) {
			const nextData = createNextData(data);
			updateItem(listToken, data.id, nextData);
		}
	};

	function handleDeleteItem() {
		if (window.confirm(`Are you sure you wish to delete ${name}?`)) {
			deleteItem(listToken, data.id);
		}
	}

	const primaryTypographyProps = {
		style: {
			fontFamily:
				"'Manrope', sans-serif, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif",
			fontWeight: '600',
			fontSize: '1.6rem',
			lineHeight: '1.4',
		},
	};

	return (
		<>
			<List dense>
				<ListItem
					secondaryAction={
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={handleDeleteItem}
						>
							<DeleteIcon />
						</IconButton>
					}
				>
					<Checkbox
						className="ListItem-checkbox"
						id="listItem"
						checked={isChecked}
						onChange={handleSelect}
					/>
					<ListItemText
						primary={
							<Typography {...primaryTypographyProps}>{name}</Typography>
						}
					/>

					<label className="ListItem-urgency">{data.urgency}</label>
				</ListItem>
			</List>
		</>
	);
}

function createNextData(data) {
	const today = new Date();
	const ONE_DAY_IN_MILLISECONDS = 86400000;

	// if the item hasn't been purchased: compare today to the date of its creation, else: compare today to the day it was last purchased
	const timeSinceLastPurchase =
		data.dateLastPurchased === null
			? getDaysBetweenDates(today.getTime(), data.dateCreated.toMillis())
			: getDaysBetweenDates(today.getTime(), data.dateLastPurchased.toMillis());

	//if the item hasn't been purchased yet: compare its next purchase date to the date of its creation, else: compare its next purchase date to the date it was last purchased
	const lastEstimatedInterval =
		data.dateLastPurchased === null
			? getDaysBetweenDates(
					data.dateNextPurchased.toMillis(),
					data.dateCreated.toMillis(),
			  )
			: getDaysBetweenDates(
					data.dateNextPurchased.toMillis(),
					data.dateLastPurchased.toMillis(),
			  );

	//use calculateEstimate to tell the time until next purchase
	const daysUntilNextPurchase = calculateEstimate(
		lastEstimatedInterval,
		timeSinceLastPurchase,
		data.totalPurchases + 1,
	);

	return {
		dateLastPurchased: today,
		totalPurchases: data.totalPurchases + 1,
		dateNextPurchased: new Date(
			today.getTime() + daysUntilNextPurchase * ONE_DAY_IN_MILLISECONDS,
		),
	};
}
