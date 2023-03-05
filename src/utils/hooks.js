import { useState, useEffect } from 'react';

/**
 * Set some state in React, and also persist that value in localStorage.
 * @param {string} initialValue The initial value to store in localStorage and React state.
 * @param {string} storageKey The key of the value in localStorage.
 */
export function useStateWithStorage(initialValue, storageKey) {
	const [value, setValue] = useState(() => {
		const currentValue = localStorage.getItem(storageKey);
		// Check if currentValue needs to be JSON parsed (if it's an object/array)
		if (currentValue && (currentValue[0] === '{' || currentValue[0] === '[')) {
			return JSON.parse(currentValue);
		}
		return currentValue ? currentValue : initialValue;
	});
	useEffect(() => {
		if (value === null || value === undefined) {
			return localStorage.removeItem(storageKey);
		}
		// If value is an object/array, stringify it before storing it in localStorage
		if (typeof value === 'object' || Array.isArray(value)) {
			return localStorage.setItem(storageKey, JSON.stringify(value));
		}

		return localStorage.setItem(storageKey, value);
	}, [storageKey, value]);
	return [value, setValue];
}
