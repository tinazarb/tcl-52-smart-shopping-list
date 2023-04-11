import { useState } from 'react';
import { updateItem, deleteItem } from '../api';
import { getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import {
	List,
	ListItem,
	ListItemText,
	IconButton,
	Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import DeleteItemModal from '../components/DeleteItemModal';

export function ListItems({ name, data, listToken }) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showItemDetails, setItemShowDetails] = useState(false);

	const openDeleteModal = () => {
		setShowDeleteModal(true);
	};

	const closeDeleteModal = () => {
		setShowDeleteModal(false);
	};

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
		deleteItem(listToken, data.id);
	}

	const calculatePurchase = (date) => {
		if (date) {
			let dateConvert = new Date(date.toMillis()).toString().split(' ');

			return `${dateConvert[1]} ${dateConvert[2]}`;
		}
		return 'N/A';
	};

	const lastPurchase = calculatePurchase(data.dateLastPurchased);

	const nextPurchase = calculatePurchase(data.dateNextPurchased);

	return (
		<>
			<List dense>
				<div className="border-solid border-b-2 ml-[5%] mr-[5%]">
					<ListItem
						secondaryAction={
							<div>
								{showItemDetails && (
									<IconButton onClick={() => setItemShowDetails(false)}>
										<ExpandLessIcon />
									</IconButton>
								)}
								{!showItemDetails && (
									<IconButton onClick={() => setItemShowDetails(true)}>
										<ExpandMoreIcon />
									</IconButton>
								)}
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={openDeleteModal}
								>
									<DeleteIcon />
								</IconButton>
							</div>
						}
					>
						{showDeleteModal && (
							<DeleteItemModal
								name={name}
								handleDeleteItem={handleDeleteItem}
								closeDeleteModal={closeDeleteModal}
								showDeleteModal={showDeleteModal}
								setShowDeleteModal={setShowDeleteModal}
							/>
						)}
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
					{showItemDetails && (
						<div className="md:ml-[5%] max-md:ml-[12%] flex md:w-[75%] max-md:w-[45%] flex-wrap justify-between mb-[1%] text-sm">
							<p className="text-light-charcoal mr-[5%]">
								Purchases:{' '}
								<span className="text-black">{data.totalPurchases}</span>
							</p>
							<p className="text-light-charcoal mr-[5%]">
								Last Purchase:{' '}
								<span className="text-black">{lastPurchase}</span>
							</p>
							<p className="text-light-charcoal mr-[5%]">
								Next Purchase:{' '}
								<span className="text-black">~ {nextPurchase}</span>
							</p>
							<p className="text-main">{data.urgency}</p>
						</div>
					)}
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
