import { React, useState } from 'react';

import { addItem } from '../api/firebase';

//we need listToken (listID) passing from App.js

export function AddItem({ listToken }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);

	const submitForm = (e) => {
		e.preventDefault();
		try {
			addItem(listToken, { itemName, daysUntilNextPurchase });
			alert('Item is saved in the database.');
		} catch (error) {
			alert('Item is not saved in the database.');
		}
		setItemName('');
		setDaysUntilNextPurchase(7);
	};

	const handleNameInput = (e) => setItemName(e.target.value);

	const handleFrequencyInput = (e) => setDaysUntilNextPurchase(e.target.value);

	return (
		<form onSubmit={(e) => submitForm(e)}>
			<fieldset>
				<label htmlFor="itemName">Item name:</label>
				<input
					type="text"
					id="itemName"
					name="itemName"
					onChange={handleNameInput}
					required
				/>

				<fieldset>
					<label htmlFor="itemFrequencyInDays">
						How soon will you buy this again?
					</label>
					<input
						type="radio"
						id="7"
						name="itemFrequencyInDays"
						value="7"
						defaultChecked
						required
						onChange={handleFrequencyInput}
					/>
					<label htmlFor="7" name="soon">
						Soon
					</label>
					<input
						type="radio"
						id="14"
						name="itemFrequencyInDays"
						value="14"
						required
						onChange={handleFrequencyInput}
					/>
					<label htmlFor="14" name="kindOfSoon">
						Kind of soon
					</label>
					<input
						type="radio"
						id="30"
						name="itemFrequencyInDays"
						value="30"
						required
						onChange={handleFrequencyInput}
					/>
					<label htmlFor="30" name="NotSoon">
						Not Soon
					</label>
				</fieldset>

				<button type="submit">Add Item</button>
			</fieldset>
		</form>
	);
}
