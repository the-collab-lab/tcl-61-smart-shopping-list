import {
	collection,
	onSnapshot,
	doc,
	addDoc,
	getDocs,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from './config';
import { getFutureDate, numOfDaysBtwnDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

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
	return snapshot.docs.map((docRef) => {
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
	// adds new List Time to the user's database
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

export async function updateItem(
	checked,
	listId,
	itemId,
	prevDateLastPurchased,
	prevDateNextPurchased,
) {
	const listItemRef = doc(db, listId, itemId);
	const listItemSnap = await getDoc(listItemRef);

	const { dateCreated, dateNextPurchased, dateLastPurchased, totalPurchases } =
		listItemSnap.data();

	const lastPurchaseDate = dateLastPurchased
		? dateLastPurchased.toDate()
		: dateCreated.toDate();
	const currentDate = new Date();

	const previousEstimate = numOfDaysBtwnDates(
		dateNextPurchased.toDate(),
		lastPurchaseDate,
	);
	const daysSinceLastPurchase = numOfDaysBtwnDates(
		lastPurchaseDate,
		currentDate,
	);

	const estimateOfDate = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchase,
		totalPurchases,
	);

	await updateDoc(listItemRef, {
		// when the user marks an item as purchased, the date is updated to today & 1 is added to number of purchases
		// when the user unchecks an item to mark it as not purchased, the date is updated to the previous purchased date & 1 is subtracted from number of purchases
		dateLastPurchased: checked ? prevDateLastPurchased : new Date(),
		dateNextPurchased: checked
			? prevDateNextPurchased
			: getFutureDate(estimateOfDate),
		totalPurchases: checked ? totalPurchases - 1 : totalPurchases + 1,
	});
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function checkItem(listId) {
	const listCollectionRef = collection(db, listId);
	const existingList = await getDocs(listCollectionRef);
	return existingList.empty ? false : true;
}
