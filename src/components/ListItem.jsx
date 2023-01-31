import './ListItem.css';

export function ListItem({ name }) {
	return (
		<>
			<li className="ListItem">
				<input type="checkbox" className="ListItem-checkbox" id="listItem" />
				<label htmlFor="listItem" className="ListItem-label">
					{name}
				</label>
			</li>
		</>
	);
}
