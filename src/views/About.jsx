import React from 'react';
import { NavLink } from 'react-router-dom';

export function About({ listToken }) {
	return (
		<div className="h-screen flex flex-col pl-20 pr-20 pb-20">
			<img className="w-20 mb-5 self-center" src="/img/limey.png" alt="logo" />

			<h1 className="text-4xl font-bold mb-10 self-center">
				Learn How <strong className="text-main-darkest">Limey</strong> Works
			</h1>
			<h2 className="mb-4 text-xl font-bold self-center">
				Add groceries to your list
			</h2>
			<p className="mb-10">
				Add items you regularly purchase to your list. When you add a new item,
				Limey will ask you to estimate how soon you'll need to buy it again.
			</p>
			<h2 className="mb-4 text-xl font-bold self-center">
				Check off items as you buy
			</h2>
			<p className="mb-10">
				As you buy your groceries, check them off your list to help Limey learn
				how often you need different items.
			</p>
			<h2 className="mb-4 text-xl font-bold self-center">
				Limey predicts your purchases
			</h2>
			<p className="mb-10 mb-10">
				Limey is a smart list that uses your buying history to predict what
				you'll need to buy next. Items you are likely to need soon will rise to
				the top of your list. Items you probably won't need for a while will
				appear lower on the list.
			</p>
			<h2 className="mb-4 text-xl font-bold self-center">
				Share your list with others!
			</h2>
			<p className="mb-1 mb-10">
				You can share the same list with everyone who shops for your household.
				Easily provide your lists's three word token to a friend or family
				member, and they can use it to join your list from Limey's home screen.
			</p>
			<div className="self-center">
				{listToken ? (
					<NavLink to="/list">
						<button className="bg-main-darkest text-white border-[1.5px] border-main-darkest rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.4)] py-2 px-12 hover:bg-charcoal hover:border-charcoal mb-20">
							Return to List
						</button>
					</NavLink>
				) : (
					<NavLink to="/" id="return-home">
						<button className="bg-main-darkest text-white border-[1.5px] border-main-darkest rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.4)] py-2 px-12 hover:bg-charcoal hover:border-charcoal mb-20">
							Get Started &raquo;
						</button>
					</NavLink>
				)}
			</div>
		</div>
	);
}
