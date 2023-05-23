import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '../components';
import { comparePurchaseUrgency } from '../api';

export function List({ data, listToken }) {
	const [itemSearch, setItemSearch] = useState('');
	const [newData, setNewData] = useState([]);
	const [sortErrorMessage, setSortErrorMessage] = useState('');

	const searchedData = useMemo(() => {
		if (!itemSearch) {
			return data;
		} else {
			return data.filter((item) => {
				return item.name.toLowerCase().includes(itemSearch);
			});
		}
	}, [data, itemSearch]);

	useEffect(() => {
		async function sortShoppingList() {
			const sortedData = await comparePurchaseUrgency(searchedData);
			try {
				setNewData(sortedData);
			} catch (e) {
				setSortErrorMessage('There was an error sorting your list');
			}
		}

		sortShoppingList();
	}, [searchedData]);

	return data.length > 0 ? (
		<div className="item-list-container">
			<form>
				<label htmlFor="itemSearch">Search your shopping list:</label>
				<input
					type="text"
					id="itemSearch"
					name="itemSearch"
					value={itemSearch}
					onChange={(e) => setItemSearch(e.target.value.toLowerCase())}
				/>
				{itemSearch && (
					<button
						onClick={() => setItemSearch('')}
						aria-label="clear search field"
					>
						<svg
							style={{ color: 'red' }}
							width="20"
							height="20"
							viewBox="0 0 26 26"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								opacity="0.8"
								d="M26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2C20.6274 2 26 7.37258 26 14Z"
								fill="currentColor"
							/>
							<g transform="translate(3, 3)">
								<path
									d="M6.85355 13.8536C6.65829 14.0488 6.34171 14.0488 6.14645 13.8536C5.95118 13.6583 5.95118 13.3417 6.14645 13.1464L13.1464 6.14645C13.3417 5.95118 13.6583 5.95118 13.8536 6.14645C14.0488 6.34171 14.0488 6.65829 13.8536 6.85355L6.85355 13.8536Z"
									fill="black"
								/>
								<path
									d="M6.14645 6.85355C5.95118 6.65829 5.95118 6.34171 6.14645 6.14645C6.34171 5.95118 6.65829 5.95118 6.85355 6.14645L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L6.14645 6.85355Z"
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
				)}
			</form>
			<form>
				<ul className="item-list">
					{newData.map((data, i) => {
						return (
							<ListItem
								key={data.id}
								name={data.name}
								listToken={listToken}
								itemId={data.id}
								dateLastPurchased={data.dateLastPurchased}
								dateNextPurchased={data.dateNextPurchased}
							/>
						);
					})}
				</ul>
			</form>
			{sortErrorMessage && <p> {sortErrorMessage} </p>}
		</div>
	) : (
		<div className="list-container">
			<p className="first-line">THIS IS WHAT YOU NEED TO BUY: </p>
			<p className="second-line">YOUR LIST IS CURRENTLY EMPTY!</p>
			<Link to={'/add-item'}>
				<button className="add-button">ADD TO LIST</button>
			</Link>
		</div>
	);
}
