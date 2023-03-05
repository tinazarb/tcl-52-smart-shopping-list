import './About.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

export function About() {
	return (
		<>
			<div className="about-icon">
				<div className="about-icon-container">
					<img
						src="../../public/img/robot-wink.png"
						alt="robot winking"
						id="about-robot-img"
					/>
				</div>
			</div>
			<h4>Accomplish the following using the Smart Shopping List App:</h4>
			<ul>
				<li>Create a new shopping list</li>
				<li>Join an existing shopping list using a three word token</li>
				<li>
					Add new items to your list and indicate when it needs to be purchased
					next
				</li>
				<li>Mark off items from your list when the item is purchased</li>
				<li>Remove items from your list</li>
				<li>Search for items on your list</li>
				<li>
					The app will determine and indicate when you should purchase an item
					next
				</li>
			</ul>
			<button>
				<NavLink to="/" id="return-home">
					Return to home
				</NavLink>
			</button>
		</>
	);
}
