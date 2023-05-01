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

	// Take current list items and remove punctuation/spaces.
	const removePunc = data.map((item) =>
		item.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
	);

	const addItemToList = async () => {
		const trimmedItemName = itemName.trim();

		try {
			// Check if the item is already on the user's list.
			if (
				removePunc.includes(
					trimmedItemName.toLowerCase().replace(/[^a-z0-9]/gi, ''),
				)
			) {
				setSubmitStatus({
					type: 'error',
					value: 'You already added this item to your list.',
				});

				// Check if the user is trying to submit an empty item.
			} else if (trimmedItemName === '') {
				setSubmitStatus({
					type: 'error',
					value: 'Please enter an item.',
				});
			} else {
				await addItem(listToken, {
					itemName: trimmedItemName,
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
		setItemName(e.target.value.split(/ +/).join(' '));
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
