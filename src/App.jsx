import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import { AddItem, Home, Layout, List, NotFound, Popup } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';

export function App() {
	const [showPopup, setShowPopup] = useState(true);
	const [data, setData] = useState([]);
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	useEffect(() => {
		if (!listToken) return;
		return streamListItems(listToken, (snapshot) => {
			const nextData = getItemData(snapshot);
			setData(nextData);
		});
	}, [listToken]);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						showPopup ? (
							<>
								<Popup setShowPopup={setShowPopup} />
								<Layout />
							</>
						) : (
							<Layout />
						)
					}
				>
					<Route
						index
						element={
							listToken ? (
								<Navigate to="/list" />
							) : (
								<Home setListToken={setListToken} />
							)
						}
					/>
					<Route
						path="/list"
						element={
							listToken ? (
								<List data={data} listToken={listToken} />
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route
						path="/add-item"
						element={
							listToken ? (
								<AddItem listToken={listToken} data={data} />
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
	);
}
