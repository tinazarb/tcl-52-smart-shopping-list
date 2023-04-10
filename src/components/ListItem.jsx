import { useState } from 'react';
import { updateItem, deleteItem } from '../api';
import { getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import {
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

	return (
		<>
			<List dense>
				<div className="border-solid border-b-2 ml-[5%] mr-[5%]">
					<ListItem
						secondaryAction={
							<div>
								<label>{data.urgency}</label>
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={handleDeleteItem}
								>
									<DeleteIcon />
								</IconButton>
							</div>
						}
					>
						<label>
							<input
								type="checkbox"
								id={name}
								checked={isChecked}
								onChange={handleSelect}
								className="hidden"
							/>
							{isChecked && (
								<FontAwesomeIcon
									icon={faCircleCheck}
									className="text-main-light mr-2 text-xl self-center peer-focus:ring rounded"
								/>
							)}
							{!isChecked && (
								<FontAwesomeIcon
									icon={faCircle}
									className="text-main-dark mr-2 hover:cursor-pointer text-xl self-center peer-focus:ring rounded"
								/>
							)}
						</label>
						<ListItemText primary={<Typography>{name}</Typography>} />
					</ListItem>
				</div>
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
