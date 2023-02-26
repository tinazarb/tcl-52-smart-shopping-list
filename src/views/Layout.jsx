import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListDots } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import './Layout.css';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="buttonContainer">
						<NavLink to="/list" className="Nav-link">
							<FontAwesomeIcon icon={faListDots} />
							<span>List</span>
						</NavLink>
					</div>
					<div className="buttonContainer">
						<NavLink to="add-item" className="Nav-link">
							<FontAwesomeIcon icon={faCartPlus} />
							<span>Add Item</span>
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
