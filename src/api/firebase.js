import { db } from './config';
import {
	collection,
	onSnapshot,
	addDoc,
	query,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { getFutureDate } from '../utils';
import { getDaysBetweenDates } from '../utils';

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	/**
	 * Firebase document snapshots contain a `.docs` property that is an array of
	 * document references. We use `.map()` to iterate over them.
	 * @see https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot
	 */
	let result = snapshot.docs.map((docRef) => {
		/**
		 * We call the `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;
		return data;
	});

	// Process it through our comparePurchaseUrgency function
	comparePurchaseUrgency(result);

	return result;
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	return addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

export async function updateItem(listId, itemId, nextData) {
	const itemRef = doc(db, listId, itemId);
	return await updateDoc(itemRef, nextData);
}

const URGENCY_NOT_SOON = 'Not Soon';
const URGENCY_KIND_OF_SOON = 'Kind of Soon';
const URGENCY_SOON = 'Soon';
const URGENCY_OVERDUE = 'Overdue';
const URGENCY_INACTIVE = 'Inactive';

//create an urgency flag for sorting the list
const urgencyFlag = (daysBetween) => {
	if (daysBetween >= 30) {
		return URGENCY_NOT_SOON;
	} else if (daysBetween >= 7) {
		return URGENCY_KIND_OF_SOON;
	} else if (daysBetween >= 0) {
		return URGENCY_SOON;
	} else if (daysBetween <= -1) {
		return URGENCY_OVERDUE;
	}
	return '';
};

//assign the appropriate urgency flag to each item
export async function comparePurchaseUrgency(itemList) {
	itemList.forEach((item) => {
		if (item.dateNextPurchased != null) {
			let daysBetween = getDaysBetweenDates(
				item.dateNextPurchased.toDate().getTime(),
				new Date().getTime(),
			);
			item.urgency = urgencyFlag(daysBetween);
		}

		// If the item has never been purchased, check if it's been 60 days since it was created and say it's inactive
		if (item.dateLastPurchased != null) {
			if (
				getDaysBetweenDates(
					new Date().getTime(),
					item.dateLastPurchased.toDate().getTime(),
				) >= 60
			) {
				item.urgency = URGENCY_INACTIVE;
			}
		}
	});

	// sort the list by urgency, placing inactive items to the bottom
	itemList.sort((a, b) => {
		if (a.urgency === URGENCY_INACTIVE) {
			return 1;
		} else if (b.urgency === URGENCY_INACTIVE) {
			return -1;
		} else if (a.dateNextPurchased.toDate() === b.dateNextPurchased.toDate()) {
			// if same date, alphabetically sort
			return a.name.localeCompare(b.name);
		} else {
			return a.dateNextPurchased.toDate() > b.dateNextPurchased.toDate()
				? 1
				: -1;
		}
	});
}

export async function deleteItem(listId, itemId) {
	const itemRef = doc(db, listId, itemId);
	return await deleteDoc(itemRef, itemId);
}

export async function checkListToken(listId) {
	const listTokenQuery = query(collection(db, listId));
	const listTokenSnapshot = await getDocs(listTokenQuery);

	return listTokenSnapshot.docs.length;
}
