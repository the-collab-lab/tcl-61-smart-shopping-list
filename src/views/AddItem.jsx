import { React, useState } from 'react';

import { addItem } from '../api/firebase';

// Removes excess spaces, punctuation, special characters, and makes all letters lowercase.
const normalizeText = (item) => {
	return item
		.trim()
		.split(/ +/)
		.join(' ')
		.toLowerCase()
		.replace(/[^a-z0-9]/gi, '');
};

export function AddItem({ data, listToken }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [submitStatus, setSubmitStatus] = useState({ type: 'idle', value: '' });

	const submitForm = (e) => {
		e.preventDefault();
		addItemToList();
	};

	// Checks if user's input item already exists in the database.
	const checkIfItemExists = (item) => {
		for (let i = 0; i < data.length; i++) {
			// Compares normalized db item to the user's normalized input item
			if (normalizeText(data[i].name) === item) {
				return true;
			}
		}
		return false;
	};

	const addItemToList = async () => {
		const normalizedItemName = normalizeText(itemName);

		try {
			// Checks if the item is already on the user's list.
			if (checkIfItemExists(normalizedItemName)) {
				setSubmitStatus({
					type: 'error',
					value: 'You already added this item to your list.',
				});

				// Checks if the user is trying to submit an empty item.
			} else if (normalizedItemName === '') {
				setSubmitStatus({ type: 'error', value: 'Please enter an item.' });
			} else {
				await addItem(listToken, {
					itemName: itemName,
					daysUntilNextPurchase,
				});

				setSubmitStatus({
					type: 'success',
					value: 'Item was successfully saved to the database',
				});
			}
		} catch (err) {
			setSubmitStatus({
				type: 'error',
				value: 'Item is NOT saved in the database',
			});
		}

		setTimeout(() => {
			setSubmitStatus({ type: 'idle', value: '' });
		}, 3000);

		setItemName('');
		setDaysUntilNextPurchase(7);
	};

	const handleNameInput = (e) => {
		setItemName(e.target.value);
	};

	const handleFrequencyInput = (e) => setDaysUntilNextPurchase(+e.target.value);

	return (
		<div className="add-item-container">
			<h2>Add an Item:</h2>
			<form onSubmit={(e) => submitForm(e)}>
				<div className="input">
					<label htmlFor="itemName">Item name:</label>
					<input
						type="text"
						id="itemName"
						className="after"
						name="itemName"
						value={itemName}
						onChange={handleNameInput}
						required
					/>
				</div>
				<p>{submitStatus.value}</p>
				<fieldset className="item-urgency-container">
					<legend htmlFor="itemFrequencyInDays">
						How soon will you buy this again?
					</legend>
					<div className="inputs">
						<input
							type="radio"
							id="7"
							name="itemFrequencyInDays"
							value="7"
							checked={daysUntilNextPurchase === 7}
							onChange={handleFrequencyInput}
						/>
						<label htmlFor="7">Soon</label>
						<input
							type="radio"
							id="14"
							name="itemFrequencyInDays"
							value="14"
							checked={daysUntilNextPurchase === 14}
							onChange={handleFrequencyInput}
						/>
						<label htmlFor="14">
							Kinda
							<br />
							soon
						</label>
						<input
							type="radio"
							id="30"
							name="itemFrequencyInDays"
							value="30"
							checked={daysUntilNextPurchase === 30}
							onChange={handleFrequencyInput}
						/>
						<label htmlFor="30">
							Not
							<br />
							Soon
						</label>
					</div>
				</fieldset>
				<button type="submit" className="flair">
					Add
				</button>
			</form>
		</div>
	);
}
