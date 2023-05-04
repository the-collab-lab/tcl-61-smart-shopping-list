import { useState, useEffect } from 'react';

import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils';

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

	const currentDate = new Date().getTime();
	const dateLastPurchasedPlus24h = dateLastPurchased
		? dateLastPurchased.toDate().getTime() + ONE_DAY_IN_MILLISECONDS
		: null;

	const wasPurchased = currentDate < dateLastPurchasedPlus24h;

	//disables ability to uncheck item if the item was marked as purchased on page load
	useEffect(() => {
		setDisabled(wasPurchased);
	}, []);

	const handleCheck = (checked) => {
		//save previous dateLastPurchased & dateNextPurchased into state to use if the user unchecks an item
		setPrevDateLastPurchased(dateLastPurchased);
		setPrevDateNextPurchased(dateNextPurchased);

		updateItem(
			checked,
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
				aria-label="Did you purchase the item?"
			></label>
			<input
				type="checkbox"
				name="wasPurchased"
				id="wasPurchased"
				value={name}
				title="Did you purchase the item?"
				checked={wasPurchased}
				disabled={disabled}
				onChange={() => handleCheck(wasPurchased)}
			/>
			{name}
		</li>
	);
}
