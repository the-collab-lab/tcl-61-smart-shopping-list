import { Outlet, NavLink } from 'react-router-dom';

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>PREDICT-A-BUY</h1>
					<nav className="Nav">
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
						<NavLink to="/list" className="Nav-link special">
							Your List
						</NavLink>
						<NavLink to="/add-item" className="Nav-link">
							Add Item
						</NavLink>
					</nav>
				</header>
				<div className="wrapper">
					<main className="Layout-main">
						<Outlet />
					</main>
					<footer>
						Created by <a href="https://github.com/hansontram">Hanson Tram</a>,{' '}
						<a href="https://github.com/lizzypine">Lizzy Pine</a>,{' '}
						<a href="https://github.com/itsoliviasparks">Olivia Sparks</a>,{' '}
						<a href="https://github.com/01001101CK">Yufa Li</a> & for{' '}
						<a href="https://the-collab-lab.codes">The Collab Lab</a>.{' '}
						<a href="https://github.com/the-collab-lab/tcl-61-smart-shopping-list">
							Browse the REPO
						</a>
						.
					</footer>
				</div>
			</div>
		</>
	);
}
