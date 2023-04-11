import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function JoinListModal({
	handleTokenSubmit,
	closeJoinExistingList,
	token,
	handleFormChange,
	listNotFound,
}) {
	return (
		<div className="bg-[rgba(0,0,0,0.5)] w-screen h-screen flex justify-center items-center fixed inset-0 z-50">
			<form
				onSubmit={handleTokenSubmit}
				className="bg-white h-fit flex flex-col gap-3 rounded-md px-10 py-7"
			>
				<FontAwesomeIcon
					icon={faXmark}
					className="text-xl self-end cursor-pointer hover:text-medium-gray -mr-4"
					onClick={closeJoinExistingList}
				></FontAwesomeIcon>
				<label htmlFor="token" className="text-xl font-bold">
					Want to join an existing list?
					<p id="token-desc" className="text-base font-normal mb-6">
						A token is three space-separated words, like{' '}
						<code className="bg-medium-gray p-1.5 rounded-lg">
							my test list
						</code>
					</p>
					<input
						type="text"
						name="token"
						id="token"
						value={token}
						onChange={handleFormChange}
						required
						aria-describedby="token-desc"
						className="text-base font-normal w-[75%] bg-medium-gray mb-3 p-2 rounded-lg"
					/>
				</label>
				{listNotFound && <p className="text-error mb-1">{listNotFound}</p>}
				<button
					type="submit"
					className="text-center bg-main-darkest text-white border-[1.5px] border-main-darkest rounded-3xl py-2 mb-3 hover:bg-charcoal hover:border-charcoal w-1/4"
				>
					Join
				</button>
			</form>
		</div>
	);
}
