import { useState } from 'react';

import { updateItem } from '../api/firebase';
// import { daysSinceLastPurchase } from '../utils';

import './ListItem.css';

const dayInMilliSec = 60 * 60 * 24 * 1000;

export function ListItem({ name, listToken, itemId, dateLastPurchased }) {
	const [prevDateLastPurchased, setPrevDateLastPurchased] = useState(null);

	const currentDate = new Date().getTime();
	const dateLastPurchasedPlus24h = dateLastPurchased
		? dateLastPurchased.toDate().getTime() + dayInMilliSec
		: null;

	const wasPurchased = currentDate < dateLastPurchasedPlus24h;

	const handleCheck = (checked) => {
		//save previous dateLastPurchased into state to use if the user unchecks an item
		setPrevDateLastPurchased(dateLastPurchased);

		// const estOfDays = daysSinceLastPurchase(currentDate, dateLastPurchased);
		updateItem(checked, listToken, itemId, prevDateLastPurchased);
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
				onChange={() => handleCheck(wasPurchased)}
			/>
			{name}
		</li>
	);
}
