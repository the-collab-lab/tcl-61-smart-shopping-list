import './Popup.css';

export function Popup({ setShowPopup }) {
	return (
		<div id="popupCon">
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
						The Collab Lab is collaborative, remote project practice for early
						career developers.
					</p>
					<p>
						The Collab Lab exists to help early-career developers, especially
						ones from historically excluded groups, land that first job in tech.
						We do that by providing remote, collaborative project practice where
						developers are mentored by professionals in the field. We augment
						the project work with targeted career advice and feedback to help
						developers get and do well in tech interviews.
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
