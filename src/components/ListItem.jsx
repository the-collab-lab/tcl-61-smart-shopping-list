import { updateItem } from '../api/firebase';
import { getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

import './ListItem.css';

const dayInMilliSec = 60 * 60 * 24 * 1000;

export function ListItem({ name, listToken, itemId, dateLastPurchased }) {
	const currentDate = new Date().getTime();
	const dateLastPurchasedPlus24h = dateLastPurchased
		? dateLastPurchased.toDate().getTime() + dayInMilliSec
		: null;

	const wasPurchased = currentDate < dateLastPurchasedPlus24h;

	const handleCheck = (checked) => {
		updateItem(checked, listToken, itemId);
		// getDaysBetweenDates (of date last purchased and RN), pass that number to
		getDaysBetweenDates(currentDate, dateLastPurchased);
		// calculateEstimate, returns a new date which we then pass
		// to the database to update the dateNextPurchased property
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
