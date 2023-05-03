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

export function getDaysBetweenDates(currentDate, dateLastPurchased) {
	if (dateLastPurchased) {
		const dateLastPurchasedInMilliSec = dateLastPurchased.toDate().getTime();
		console.log(dateLastPurchasedInMilliSec);
	} else {
		console.log('no data');
	}
	//convert to milliseconds
	//return the number of days that have passed between them
	// return dateTwo - dateOne .toDate()
	// console.log(currentDate);
	// console.log(dateLastPurchased);
}
