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
	// useEffect not needed to set state for the urgency value bc we have immediate access to data from props (component is assumed to have the props when rendered via .map in List.jsx)
	// Instead, the urgency value can be determined directly within the ListItem component using the data from props and the logic to determine the urgency.

	const itemUrgency = () => {
		const today = new Date();
		const differenceOfDays = numOfDaysBtwnDates(
			today,
			dateNextPurchased.toDate(),
		);

		if (
			dateLastPurchased !== null &&
			numOfDaysBtwnDates(dateLastPurchased.toDate(), today) >= 60
		)
			return 'inactive';
		else if (differenceOfDays <= 7) {
			return 'soon';
		} else if (differenceOfDays < 30) {
			return 'kind of soon';
		} else {
			return 'not soon';
		}
	};

	const [prevDateLastPurchased, setPrevDateLastPurchased] = useState(null);
	const [prevDateNextPurchased, setPrevDateNextPurchased] = useState(null);
	const [disabled, setDisabled] = useState(false);

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

	return (
		<li className="ListItem">
			<label
				htmlFor="wasPurchased"
				aria-label={
					disabled
						? 'Not available for purchase until 24 hours have passed since the previous purchase'
						: 'Did you purchase the item?'
				}
			></label>
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
			{name} {wasPurchased ? null : `(${itemUrgency()})`}
		</li>
	);
}
