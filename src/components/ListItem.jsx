import { useState, useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS, numOfDaysBtwnDates } from '../utils';
import { updateItem, deleteItem } from '../api/firebase';

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
	// const [groupedNames, setGroupedNames] = useState({});

	// useEffect(() => {
	// 	const updatedGroupedNames = {};
	// 	if (!updatedGroupedNames[`${itemUrgency()}`]) {
	// 		updatedGroupedNames[`${itemUrgency()}`] = [];
	// 	}
	// 	updatedGroupedNames[`${itemUrgency()}`].push(name);

	// 	setGroupedNames(updatedGroupedNames);
	// }, [name]);

	// console.log(groupedNames);

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
				<h3>{`${itemUrgency()}`}</h3>
			</div>
			{/* {groupedNames[`${itemUrgency()}`].map((itemName, index) => (
				<li className="ListItem" key={Math.random() * 100}> */}
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
				<span>
					{/* <span>{itemName}</span> */}
					<span>{name}</span>
				</span>
				<button
					onClick={(e) => {
						handleDelete(e);
					}}
					className="delete-button"
				>
					<svg
						style={{ color: 'red' }}
						width="20"
						height="20"
						viewBox="0 0 26 26"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="0.8"
							d="M26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2C20.6274 2 26 7.37258 26 14Z"
							fill="currentColor"
						/>
						<g transform="translate(3, 3)">
							<path
								d="M8.5 14.999C8.5 15.2752 8.27614 15.499 8 15.499C7.72386 15.499 7.5 15.2752 7.5 14.999V8.99902C7.5 8.72288 7.72386 8.49902 8 8.49902C8.27614 8.49902 8.5 8.72288 8.5 8.99902V14.999Z"
								fill="black"
							/>
							<path
								d="M10.5 14.999C10.5 15.2752 10.2761 15.499 10 15.499C9.72386 15.499 9.5 15.2752 9.5 14.999V8.99902C9.5 8.72288 9.72386 8.49902 10 8.49902C10.2761 8.49902 10.5 8.72288 10.5 8.99902V14.999Z"
								fill="black"
							/>
							<path
								d="M12.5 14.999C12.5 15.2752 12.2761 15.499 12 15.499C11.7239 15.499 11.5 15.2752 11.5 14.999V8.99902C11.5 8.72288 11.7239 8.49902 12 8.49902C12.2761 8.49902 12.5 8.72288 12.5 8.99902V14.999Z"
								fill="black"
							/>
							<path
								d="M11.5004 4.4989H11.4994H8.50072C8.50072 3.67169 9.17379 2.99951 10.0001 2.99951C10.8268 2.99951 11.4998 3.67169 11.5004 4.49792V4.4989Z"
								fill="black"
							/>
							<path
								d="M4.5 4.99902C4.22386 4.99902 4 4.77517 4 4.49902C4 4.22288 4.22386 3.99902 4.5 3.99902H15.5C15.7761 3.99902 16 4.22288 16 4.49902C16 4.77517 15.7761 4.99902 15.5 4.99902H4.5Z"
								fill="black"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M14.5 5.5H5.5C5.22386 5.5 5 5.72386 5 6V17C5 17.2761 5.22386 17.5 5.5 17.5H14.5C14.7761 17.5 15 17.2761 15 17V6C15 5.72386 14.7761 5.5 14.5 5.5ZM6 16.5V6.5H14V16.5H6Z"
								fill="black"
							/>
						</g>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13 24.5C19.3513 24.5 24.5 19.3513 24.5 13C24.5 6.64873 19.3513 1.5 13 1.5C6.64873 1.5 1.5 6.64873 1.5 13C1.5 19.3513 6.64873 24.5 13 24.5ZM13 25.5C19.9036 25.5 25.5 19.9036 25.5 13C25.5 6.09644 19.9036 0.5 13 0.5C6.09644 0.5 0.5 6.09644 0.5 13C0.5 19.9036 6.09644 25.5 13 25.5Z"
							fill="black"
						/>
					</svg>
				</button>
			</li>
			{/* ))} */}
		</>
	);
}
