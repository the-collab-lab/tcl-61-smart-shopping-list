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
		<>
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
						x
					</button>
				)}
			</form>
			<form>
				<ul>
					{newData.map((data, i) => {
						return (
							<ListItem
								key={i}
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
		</>
	) : (
		<div>
			<p>
				Welcome to your shopping list. Your Shopping List is currently empty!
			</p>
			<Link to={'/add-item'}>
				<button>Add Item</button>
			</Link>
		</div>
	);
}
