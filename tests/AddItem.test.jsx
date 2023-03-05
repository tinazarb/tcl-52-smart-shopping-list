import { screen, render } from '@testing-library/react';
import { AddItem } from '../src/views/AddItem';
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

it('renders add item button', () => {
	render(<AddItem data={list} />);
	const buttonElement = screen.getByRole('button', {
		name: /add item/i,
	});
	expect(buttonElement).toBeInTheDocument();
});
