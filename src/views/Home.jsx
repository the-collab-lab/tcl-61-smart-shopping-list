import './Home.css';
import { useState, useCallback } from 'react';
import { getItemData, streamListItems } from '../api';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ setListToken }) {
	const [tokenInput, setTokenInput] = useState('');

	const handleClick = useCallback(() => {
		const newToken = generateToken();
		setListToken(newToken);
	}, [setListToken]);

	const tokenHandler = (e) => {
		setTokenInput(e.target.value);
	};

	const handleTokenSubmit = (e) => {
		e.preventDefault();
		streamListItems(tokenInput, (snapshot) => {
			const listData = getItemData(snapshot);
			if (listData?.length === 0) {
				alert('this token does not exist');
			} else {
				setListToken(tokenInput);
			}
		});
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleClick} className="createListBtn">
				Create a new list
			</button>

			<form onSubmit={handleTokenSubmit}>
				<label htmlFor="join-list">
					Enter a three-words token to join existing shopping list
				</label>
				<input
					type="text"
					onChange={tokenHandler}
					value={tokenInput}
					name="join-list"
					id="join-list"
				/>

				<button type="submit" disabled={!tokenInput}>
					Join Shopping List
				</button>
			</form>
		</div>
	);
}
