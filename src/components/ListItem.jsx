import { useState, useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS, numOfDaysBtwnDates } from '../utils';
import { updateItem, deleteItem } from '../api/firebase';
import deleteButton from '/img/deleteButton.png';

export function ListItem({
	name,
	listToken,
	newArray,
	itemId,
	dateLastPurchased,
	dateNextPurchased,
}) {
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

	const handleDelete = (e) => {
		e.preventDefault();
		if (window.confirm(`Are you sure you want to delete ${name}?`)) {
			deleteItem(listToken, itemId);
		}
	};

	return (
		<>
			<div className="item-urgency">
				<h3 className="urgency-list">{`${itemUrgency()}`}</h3>
			</div>
			<li className="ListItem">
				<label
					htmlFor="wasPurchased"
					aria-label={
						disabled
							? 'Not available for purchase until 24 hours have passed since the previous purchase'
							: 'Did you purchase the item?'
					}
					className="checkbox-label"
				>
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
				</label>
				<span>{name}</span>
				<button
					onClick={(e) => {
						handleDelete(e);
					}}
					className="delete-button"
				>
					<img
						src={deleteButton}
						className="delete-button-png"
						alt="delete-button"
					/>
				</button>
			</li>
		</>
	);
}
