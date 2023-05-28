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
				<div className="search-input">
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
							<i
								className="fa-solid fa-circle-xmark"
								alt="delete"
								title="clear search field"
							></i>
						</button>
					)}
				</div>
			</form>
			<form>
				<h2>This is what you need to buy:</h2>
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
		<>
			<h2>Your Shopping List is currently empty!</h2>
			<Link to={'/add-item'}>
				<button className="flair">Add to List</button>
			</Link>
		</>
	);
}
