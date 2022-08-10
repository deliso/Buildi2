import ClientRegister from './clientRegister';
import { createEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Route, Router } from 'react-router-dom';
// import { register } from '../service/projectService.js';

describe('Register a client', () => {
	it('should render the clientRegister component', () => {
		render(<ClientRegister />, { wrapper: MemoryRouter });
		const clientRegForm = screen.getByTestId('client-reg-form');
		expect(clientRegForm).toBeInTheDocument();
	});
	it('should render the text typed into the form', () => {
		render(<ClientRegister />, { wrapper: MemoryRouter });
		const inputText = 'test@test.com';
		const emailInputField = screen.getByLabelText('Email');
		createEvent.input(emailInputField, inputText);
		expect(inputText).toBeInTheDocument();
	});
});

// const testUser = {
// 	profilePic: '',
// 	email: 'testio.testales@tmail.com',
// 	password: 'test_password',
// 	userType: 'contractor',
// 	firstName: 'Testio',
// 	lastName: 'Testales',
// 	location: 'San Diego',
// };

// describe('Register form', () => {
// 	jest.mock('../service/projectService.js', () => {
// 		register: () => ({
// 			profilePic: '',
// 			email: 'testio.testales@tmail.com',
// 			password: 'test_password',
// 			userType: 'contractor',
// 			firstName: 'Testio',
// 			lastName: 'Testales',
// 			location: 'San Diego',
// 		});
// 	});

// 	it('should call register with the correct data', async () => {
// 		const setUser = jest.fn();
// 		const credentials = testUser;

// 		render(<clientRegister />);

// 		const emailInput = screen.getByLabelText(/Email/);
// 		const passwordInput = screen.getByLabelText(/Password/);
// 		const firstNameInput = screen.getByLabelText(/First Name/);
// 		const lastNameInput = screen.getByLabelText(/Last Name/);
// 		const locationInput = screen.getByLabelText(/Location/);
// 		const profilePicInput = screen.getByTestId(/profilePic/);
// 		const userTypeInput = 'client';
// 		const submitBtn = screen.getByRole('button', { type: /Submit/i });
// 		userEvent.type(emailInput, 'testio.testales@tmail.com');
// 		userEvent.type(passwordInput, 'test_password');
// 		userEvent.type(firstNameInput, 'Testio');
// 		userEvent.type(lastNameInput, 'Testales');
// 		userEvent.type(locationInput, 'San Diego');

// 		fireEvent.change(userTypeInput, { target: { value: 'client' } });
// 		await waitFor(() =>
// 			fireEvent.change(profilePicInput, {
// 				target: { files: [''] },
// 			})
// 		);
// 		// userEvent.type(profilePicInput, 'testio.testales@tmail.com');

// 		await userEvent.click(submitBtn);

// 		expect(setUser).toHaveBeenCalledWith(credentials);
// 	});
// });
