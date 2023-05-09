import { useState, useEffect } from 'react';

import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS, numOfDaysBtwnDates } from '../utils';

import './ListItem.css';

export function ListItem({
	name,
	listToken,
	itemId,
	dateLastPurchased,
	dateNextPurchased,
}) {
	const [prevDateLastPurchased, setPrevDateLastPurchased] = useState(null);
	const [prevDateNextPurchased, setPrevDateNextPurchased] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [urgency, setUrgency] = useState('');

	const currentDate = new Date().getTime();
	const dateLastPurchasedPlus24h = dateLastPurchased
		? dateLastPurchased.toDate().getTime() + ONE_DAY_IN_MILLISECONDS
		: null;

	const wasPurchased = currentDate < dateLastPurchasedPlus24h;

	//disables ability to uncheck item if the item was marked as purchased on page load
	useEffect(() => {
		if (!prevDateLastPurchased && !prevDateNextPurchased) {
			setDisabled(wasPurchased);
		}
	}, [wasPurchased, prevDateNextPurchased, prevDateLastPurchased]);

	const handleCheck = () => {
		//save previous dateLastPurchased & dateNextPurchased into state to use if the user unchecks an item
		setPrevDateLastPurchased(dateLastPurchased);
		setPrevDateNextPurchased(dateNextPurchased);

		updateItem(
			wasPurchased,
			listToken,
			itemId,
			prevDateLastPurchased,
			prevDateNextPurchased,
		);
	};

	//if dateLastPurchased is null (meaning new list item), we will find the difference between NextPurchasedDate and currentDate,
	//else, we find the difference between lastPurchasedDate and currentDate

	useEffect(() => {
		let differenceOfDays;
		const today = new Date();
		if (dateLastPurchased === null) {
			differenceOfDays = numOfDaysBtwnDates(today, dateNextPurchased.toDate());
		} else {
			differenceOfDays = numOfDaysBtwnDates(dateLastPurchased.toDate(), today);
		}
		if (differenceOfDays <= 7) setUrgency('soon');
		if (differenceOfDays < 30 && differenceOfDays > 7)
			setUrgency('kind of soon');
		if (differenceOfDays >= 30) setUrgency('not soon');
		if (differenceOfDays >= 60) setUrgency('inactive');
	}, [dateLastPurchased, dateNextPurchased]);

	return (
		<li className="ListItem">
			<label
				htmlFor="wasPurchased"
				aria-label={
					disabled
						? 'Not available for purchase until 24 hours have passed since the previous purchase'
						: 'Did you purchase the item?'
				}
			>
				{urgency}
			</label>
			<input
				type="checkbox"
				name="wasPurchased"
				id="wasPurchased"
				value={name}
				title={
					disabled
						? 'Not available for purchase until 24 hours have passed since the previous purchase'
						: 'Did you purchase the item?'
				}
				checked={wasPurchased}
				disabled={disabled}
				onChange={handleCheck}
			/>
			{name}
		</li>
	);
}
