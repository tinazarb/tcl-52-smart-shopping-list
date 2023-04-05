import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

export function ListHeader({ listToken, showAddItem }) {
	const [copiedToken, setCopiedToken] = useState(false);

	const copyTokenToClipboard = () => {
		window.navigator.clipboard.writeText(listToken);
		setCopiedToken(true);

		setTimeout(() => {
			setCopiedToken(false);
		}, 3000);
	};
	return (
		<header className="py-8">
			<div className="flex items-start py-8 px-10">
				<img src="/img/limey.png" alt="logo" className="w-10" />
				<h1 className="font-medium text-3xl pl-2 mr-auto">Limey</h1>
				<div>
					<button
						className={`${!showAddItem && 'hover:text-main'}`}
						onClick={copyTokenToClipboard}
						aria-describedby="share-button"
						disabled={showAddItem}
					>
						<FontAwesomeIcon
							icon={faArrowUpFromBracket}
							className={`h-5 ${!showAddItem && 'hover:text-main'}`}
						></FontAwesomeIcon>
						<span className="icon mt-1 ml-1.5 text-m" id="share-button">
							Share your list
						</span>
					</button>
				</div>
			</div>
			<div className="flex flex-col items-center">
				{copiedToken && <p>Your unique token:</p>}
				{copiedToken && (
					<input
						className="outline-0 py-2 px-4 bg-medium-gray text-sm rounded-3xl text-center"
						type="text"
						id="shareToken"
						name="shareToken"
						value={listToken}
						aria-describedby="token-copied"
						readOnly
					/>
				)}
				{copiedToken && <p className="text-main">Copied to clipboard!</p>}
			</div>
		</header>
	);
}
