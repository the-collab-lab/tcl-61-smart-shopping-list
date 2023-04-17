import { useState } from 'react';

import { ListItem } from '../components';

export function List({ data }) {
	const [itemSearch, setItemSearch] = useState('');

	const handleSearchInput = (e) => {
		setItemSearch(e.target.value.toLowerCase());
	};

	const handleClear = () => {
		setItemSearch('');
	};

	return (
		<>
			<form>
				<label htmlFor="itemSearch">Item name:</label>
				<input
					type="text"
					id="itemSearch"
					name="itemSearch"
					value={itemSearch}
					onChange={handleSearchInput}
				/>
				{itemSearch ? <button onClick={handleClear}>x</button> : null}
			</form>
			<ul>
				{data
					.filter((item) => item.name.toLowerCase().includes(itemSearch))
					.map((data, i) => (
						<ListItem key={i} name={data.name} />
					))}
			</ul>
		</>
	);
}
