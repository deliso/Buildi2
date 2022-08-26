// import { render, screen } from '@testing-library/react';
// import App from './App';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test.only('renders learn react link', () => {
	render(<App />, { wrapper: MemoryRouter });
	const appTitle = screen.getByTestId('buildi');
	expect(appTitle).toBeInTheDocument();
});
