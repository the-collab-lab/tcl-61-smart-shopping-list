import { useState, useMemo } from 'react';

import { ListItem } from '../components';

export function List({ data, listToken }) {
	const [itemSearch, setItemSearch] = useState('');

	const searchedData = useMemo(() => {
		if (!itemSearch) {
			return data;
		} else {
			return data.filter((item) => {
				return item.name.toLowerCase().includes(itemSearch);
			});
		}
	}, [data, itemSearch]);

	return (
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
					{searchedData.map((data, i) => {
						return (
							<ListItem
								key={i}
								name={data.name}
								listToken={listToken}
								itemId={data.id}
								dateLastPurchased={data.dateLastPurchased}
							/>
						);
					})}
				</ul>
			</form>
		</>
	);
}
