/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				main: '#8ab301',
				'main-light': '#91bd00',
				'main-dark': '#669c4e',
				'main-darkest': '#558341',
				charcoal: '#2a2933',
				'light-charcoal': '#807B73',
				'medium-gray': '#dddce6',
				error: '#c3360b',
				'error-dark': '#962A09',
			},
		},
	},
	plugins: [],
};
