import { React, useState } from 'react';

import { addItem } from '../api/firebase';

export function AddItem({ data, listToken }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [submitStatus, setSubmitStatus] = useState({ type: 'idle', value: '' });

	const submitForm = (e) => {
		e.preventDefault();
		addItemToList();
	};

	// Removes excess spaces or special characters, and makes all leters lowercase.
	const normalizeText = (item) => {
		return item
			.trim() // removes space before and after item
			.split(/ +/) // removes extra spaces between words
			.join(' ')
			.toLowerCase() // makes text all lowercase
			.replace(/[^a-z0-9]/gi, ''); // remove punctuation and special characters
	};

	// Checks if user's input item already exists in the database.
	const checkIfItemExists = (item) => {
		for (let i = 0; i < data.length; i++) {
			// If the current database item (normalized) is the same as the user's input item (normalized)
			if (normalizeText(data[i].name) === normalizeText(itemName)) {
				return true;
			}
		}
		return false;
	};

	const addItemToList = async () => {
		const normalizedItemName = normalizeText(itemName);

		try {
			// Check if the item is already on the user's list.
			if (checkIfItemExists(normalizedItemName)) {
				setSubmitStatus({
					type: 'error',
					value: 'You already added this item to your list.',
				});
				setTimeout(() => {
					setSubmitStatus({
						type: 'idle',
						value: '',
					});
				}, 3000);

				// Check if the user is trying to submit an empty item.
			} else if (normalizedItemName === '') {
				setSubmitStatus({
					type: 'error',
					value: 'Please enter an item.',
				});
				setTimeout(() => {
					setSubmitStatus({
						type: 'idle',
						value: '',
					});
				}, 3000);
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
		setItemName('');
		setDaysUntilNextPurchase(7);
	};

	const handleNameInput = (e) => {
		setItemName(e.target.value);
	};

	const handleFrequencyInput = (e) => setDaysUntilNextPurchase(+e.target.value);

	return (
		<form onSubmit={(e) => submitForm(e)}>
			<label htmlFor="itemName">Item name:</label>
			<input
				type="text"
				id="itemName"
				name="itemName"
				value={itemName}
				onChange={handleNameInput}
				required
			/>

			<fieldset>
				<legend htmlFor="itemFrequencyInDays">
					How soon will you buy this again?
				</legend>
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
				<label htmlFor="14">Kind of soon</label>
				<input
					type="radio"
					id="30"
					name="itemFrequencyInDays"
					value="30"
					checked={daysUntilNextPurchase === 30}
					onChange={handleFrequencyInput}
				/>
				<label htmlFor="30">Not Soon</label>
			</fieldset>

			<button type="submit">Add Item</button>
			<p>{submitStatus.value}</p>
		</form>
	);
}
