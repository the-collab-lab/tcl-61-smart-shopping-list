import './popup.css';

export function Popup({ setShowPopup }) {
	return (
		<div id="popupCon">
			<div id="bg"></div>
			<div id="popup">
				<link
					href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
					rel="stylesheet"
				></link>
				<button
					id="close"
					aria-label="Close"
					onClick={() => setShowPopup(false)}
				>
					X
				</button>
				<p>
					This Smart Shopping List App was made by early-career developers at
					The Collab Lab.
				</p>
				<p>This project has now been archived.</p>
				<div className="token">
					<p>To view the demo shopping list, enter the three word token: </p>
					<div id="threeWordToken">
						<p>the collab lab</p>
						<button
							id="copy"
							onClick={() => navigator.clipboard.writeText('the collab lab')}
						>
							Copy Token
						</button>
					</div>
				</div>
				<ul>
					<p>
						Please note that the following features are no longer supported:
					</p>
					<li>Creating new shopping lists</li>
					<li>Adding & deleting items from the shopping list</li>
					<li>Marking items on the list as purchased</li>
				</ul>
				<div className="tcl">
					<p>
						The Collab Lab provides collaborative, remote project practice for
						early career developers.
					</p>
					<a
						href="https://the-collab-lab.codes"
						target="_blank"
						rel="noreferrer"
						aria-label="link text - new window"
					>
						the-collab-lab.codes
					</a>
				</div>
			</div>
		</div>
	);
}
