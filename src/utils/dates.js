import { Timestamp } from 'firebase/firestore';

const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function numOfDaysBtwnDates(dateOne, dateTwo) {
	const dateOneMillisec = dateOne.toDate().getTime();
	const dateTwoMillisec = dateTwo.toDate().getTime();
	const difference = Math.abs(dateOneMillisec - dateTwoMillisec);
	return Math.round(difference / ONE_DAY_IN_MILLISECONDS);
}
