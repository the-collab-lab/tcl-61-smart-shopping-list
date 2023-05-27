import { useState } from 'react';
import { checkItem } from '../api';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

import { ReactSVG } from 'react-svg';

export function Home({ setListToken }) {
	const [tokenInput, setTokenInput] = useState('');
	const [submitStatus, setSubmitStatus] = useState({ type: 'idle', value: '' });

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
					setStatusWithTimeout('This token does not exist!', 3000);
				}
			})
			.catch(() => {
				setStatusWithTimeout(
					'There was an error accessing your list. Please try again.',
					3000,
				);
			});
		setTokenInput('');
	};

	const setStatusWithTimeout = (value, delay) => {
		setSubmitStatus({ type: 'error', value });
		setTimeout(() => {
			setSubmitStatus({ type: 'idle', value: '' });
		}, delay);
	};

	return (
		<div className="Home">
			<h2>Join a List:</h2>
			<div className="option">
				<h3>Option #1</h3>
			</div>
			<form onSubmit={handleTokenSubmit}>
				<div className="input">
					<label htmlFor="join-list">Enter a three word token:</label>
					<input
						type="text"
						onChange={(e) => setTokenInput(e.target.value)}
						value={tokenInput}
						name="join-list"
						id="join-list"
					/>
				</div>
				<div className="after">
					<ReactSVG className="after" src="/img/after.svg" />
					<button type="submit" disabled={!tokenInput}>
						Join
					</button>
				</div>
			</form>
			<p>{submitStatus.value}</p>
			<div className="option right">
				<h3>Option #2</h3>
			</div>
			<div className="before">
				<button onClick={handleClick} className="createListBtn">
					Create a new list
				</button>
				<ReactSVG className="before" src="/img/before.svg" />
			</div>
		</div>
	);
}
