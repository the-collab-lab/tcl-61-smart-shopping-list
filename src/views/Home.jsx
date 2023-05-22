import { useState } from 'react';
import { checkItem } from '../api';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ setListToken }) {
	const [tokenInput, setTokenInput] = useState('');
	const [isError, setIsError] = useState(false);

	const handleClick = () => {
		const newToken = generateToken();
		setListToken(newToken);
	};

	const handleTokenSubmit = (e) => {
		e.preventDefault();
		const modifiedInput = tokenInput.trim().toLowerCase();
		checkItem(modifiedInput)
			.then((shoppingList) => {
				if (shoppingList) {
					setListToken(modifiedInput);
				} else {
					setIsError(true);
				}
			})
			.catch((error) => {
				setIsError(true);
			});
		setTokenInput('');
	};

	return (
		<div className="Home">
			<h2>Join a List:</h2>
			<button onClick={handleClick} className="createListBtn">
				Create a new list
			</button>

			<form onSubmit={handleTokenSubmit}>
				<label htmlFor="join-list">
					Enter a three word token to join existing shopping list
				</label>
				<input
					type="text"
					onChange={(e) => setTokenInput(e.target.value)}
					value={tokenInput}
					name="join-list"
					id="join-list"
				/>

				<button type="submit" disabled={!tokenInput}>
					Join Shopping List
				</button>
			</form>
			{isError ? <p>This token does not exist!</p> : null}
		</div>
	);
}
