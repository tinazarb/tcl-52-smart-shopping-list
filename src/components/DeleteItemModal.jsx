import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function DeleteItemModal({
	name,
	handleDeleteItem,
	closeDeleteModal,
	showDeleteModal,
	setShowDeleteModal,
}) {
	useEffect(() => {
		const handleKeyEvents = (e) => {
			if (e.keyCode === 27) setShowDeleteModal(false);
		};

		if (showDeleteModal) {
			document.addEventListener('keydown', handleKeyEvents);
		}
		return () => {
			document.removeEventListener('keydown', handleKeyEvents);
		};
	}, [showDeleteModal, setShowDeleteModal]);

	return (
		<div className="bg-[rgba(0,0,0,0.5)] w-screen h-screen flex justify-center items-center fixed z-50">
			<div className="bg-white h-fit flex flex-col gap-3 rounded-md px-10 py-7">
				<FontAwesomeIcon
					icon={faXmark}
					className="text-xl self-end cursor-pointer hover:text-medium-gray -mr-4"
					onClick={closeDeleteModal}
				></FontAwesomeIcon>
				<h3 htmlFor="token" className="text-xl">
					Are you sure you wish to delete <strong>{`${name}`}</strong>?
				</h3>
				<div className="flex justify-evenly mt-2 mb-3">
					<button
						type="button"
						className="text-center bg-medium-gray text-black border-[1.5px] border-black rounded-3xl py-3 hover:bg-light-charcoal hover:border-black w-[40%]"
						onClick={closeDeleteModal}
					>
						No, Cancel
					</button>
					<button
						type="button"
						className="text-center bg-error text-white border-[1.5px] border-error rounded-3xl  py-3  hover:bg-error-dark border-[1.5px] hover:border-error-dark w-[40%]"
						onClick={handleDeleteItem}
					>
						Yes, Delete
					</button>
				</div>
			</div>
		</div>
	);
}
