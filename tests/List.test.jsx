import { render, screen } from '@testing-library/react';
import { List } from '../src/views/List';
import { Timestamp } from 'firebase/firestore';

const list = [
	{
		totalPurchases: 1,
		dateCreated: new Timestamp({
			seconds: 1672712245,
			nanoseconds: 697000000,
		}),
		dateNextPurchased: new Timestamp({
			seconds: 1673317045,
			nanoseconds: 697000000,
		}),
		dateLastPurchased: null,
		name: 'Apples',
		id: 'nW49y1E9FJ8HiiyzCUmG',
		urgency: 'Overdue',
	},
	{
		totalPurchases: 0,
		name: 'Oranges',
		dateCreated: new Timestamp({
			seconds: 1672712245,
			nanoseconds: 698000000,
		}),
		dateNextPurchased: new Timestamp({
			seconds: 1672712245,
			nanoseconds: 698000000,
		}),
		dateLastPurchased: null,
		id: 'ZdfejD6MKG7uTeMReFEj',
		urgency: 'Overdue',
	},
];

it('renders checkboxes', () => {
	render(<List data={list} />);
	expect(
		screen.getByLabelText('Apples', { checked: true }),
	).toBeInTheDocument();
});

it('renders delete button for every item', () => {
	render(<List data={list} />);
	const deleteButton = screen.getAllByRole('button', {
		name: /delete/i,
	});
	expect(deleteButton).toHaveLength(2);
});
