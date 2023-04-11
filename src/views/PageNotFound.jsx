import React from 'react';
import { Link } from 'react-router-dom';

export function PageNotFound({ listToken }) {
	return (
		<>
			<header className="pt-8">
				<div className="flex items-start pt-8 px-10">
					<img src="/img/limey.png" alt="logo" className="w-10" />
					<h1 className="font-medium text-3xl pl-2 mr-auto">Limey</h1>
				</div>
			</header>
			<div className="flex justify-center mt-[10%] ml-[10%] mr-[10%]">
				<div className="">
					<h1 className="text-3xl font-bold mb-[2%]"> Page Not Found</h1>
					<p className="text-lg mb-[5%]">
						The page you are looking for does not exist!
					</p>
					{listToken && (
						<Link to="/list" className="text-2xl hover:text-main">
							Head back to your list &raquo;
						</Link>
					)}
					{!listToken && (
						<Link to="/" className="text-2xl hover:text-main">
							Head back to home &raquo;
						</Link>
					)}
				</div>
			</div>
			<div className="bg-[url('/img/fruit-background-horizontal.jpg')] w-full h-[15rem] fixed bottom-0 bg-cover"></div>
		</>
	);
}
