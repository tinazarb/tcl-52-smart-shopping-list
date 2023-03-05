import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faListDots } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import './Layout.css';

export function Layout({ listToken }) {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart Shopping List</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				{listToken ? (
					<nav className="Nav">
						<div className="buttonContainer leftNav">
							<NavLink to="/" className="Nav-link">
								<FontAwesomeIcon icon={faHouse} />
								<span>Home</span>
							</NavLink>
						</div>
						<div className="buttonContainer leftNav">
							<NavLink to="/list" className="Nav-link">
								<FontAwesomeIcon icon={faListDots} />
								<span>List</span>
							</NavLink>
						</div>
						<div className="buttonContainer rightNav">
							<NavLink to="add-item" className="Nav-link">
								<FontAwesomeIcon icon={faCartPlus} />
								<span>Add Item</span>
							</NavLink>
						</div>
					</nav>
				) : (
					''
				)}
			</div>
		</>
	);
}
