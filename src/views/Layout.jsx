import { Outlet, NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<div className="title-container">
						<ReactSVG className="star-top" src="/img/star4.svg" />
						<ReactSVG className="star-left" src="/img/star3.svg" />
						<h1>PREDICT-A-BUY</h1>
						<ReactSVG className="star-right" src="/img/star1.svg" />
					</div>
					<nav className="Nav">
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
						<ReactSVG className="lines-before" src="/img/lines-before.svg" />
						<NavLink to="/list" className="Nav-link special">
							<span className="top">Your</span>
							<span className="bottom">List</span>
						</NavLink>
						<ReactSVG className="lines-after" src="/img/lines-after.svg" />
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
