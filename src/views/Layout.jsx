import { Outlet, useLocation } from 'react-router-dom';

export function Layout() {
	const isAboutLocation = useLocation().pathname === '/about';

	return (
		<div>
			{isAboutLocation && (
				<header className="py-8">
					<div className="flex items-start px-10">
						<img src="/img/limey.png" alt="logo" className="w-10" />
						<h1 className="font-medium text-3xl pl-2 mr-auto">Limey</h1>
					</div>
				</header>
			)}
			<main className="Layout-main">
				<Outlet />
			</main>
		</div>
	);
}
