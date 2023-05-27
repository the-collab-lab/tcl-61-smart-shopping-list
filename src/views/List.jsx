import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '../components';
import { comparePurchaseUrgency } from '../api';
import deleteButton from '/img/deleteButton.png';

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
						className="delete-button"
					>
						<img
							src={deleteButton}
							className="delete-button-png"
							alt="delete-button"
						/>
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
								nameArray={newData}
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
			<h2 className="first-line">THIS IS WHAT YOU NEED TO BUY: </h2>
			<p className="second-line">YOUR LIST IS CURRENTLY EMPTY!</p>
			<h2>This is what you need to buy:</h2>
			<p>Your Shopping List is currently empty!</p>
    		<div>
			<Link to={'/add-item'}>
				<button className="add-button">ADD TO LIST</button>
			</Link>
		</div>
	);
}
