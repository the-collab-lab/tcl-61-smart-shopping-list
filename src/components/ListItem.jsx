import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';

import './ListItem.css';

export function ListItem({ name, listToken, itemId, dateLastPurchased }) {
	const [wasPurchased, setWasPurchased] = useState(false);

	const handleCheck = (checked) => {
		updateItem(checked, listToken, itemId);
		setWasPurchased((prevWasPurchased) => !prevWasPurchased);
	};

	useEffect(() => {
		const currentDate = new Date().getTime();
		const dayInMilliSec = 60 * 60 * 24 * 1000;

		const dateLastPurchasedPlus24h = dateLastPurchased
			? dateLastPurchased.toDate().getTime() + dayInMilliSec
			: null;

		setWasPurchased(currentDate < dateLastPurchasedPlus24h);
	}, [dateLastPurchased]);

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
