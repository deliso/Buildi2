import ClientRegister from './clientRegister';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Route, Router } from 'react-router-dom';

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
		fireEvent.change(emailInputField, { target: { value: inputText } });
		expect(emailInputField.value).toBe(inputText);
	});
});

// const testUser = {
// 	// profilePic: '',
// 	email: 'testio.testales@tmail.com',
// 	password: 'test_password',
// 	// userType: 'contractor',
// 	firstName: 'Testio',
// 	lastName: 'Testales',
// 	location: 'San Diego',
// };

// const user = userEvent.setup();

// describe('Sumbit register form', () => {
// 	jest.mock(projectService, () => {
// 		register: () => ({
// 			email: 'testio.testales@tmail.com',
// 			password: 'test_password',
// 			firstName: 'Testio',
// 			lastName: 'Testales',
// 			location: 'San Diego',
// 		});
// 	});

// it('should call register with the correct data', async () => {
// 	const credentials = testUser;

// 	render(<ClientRegister />, { wrapper: MemoryRouter });

// 	const emailInput = screen.getByLabelText(/Email/);
// 	const passwordInput = screen.getByLabelText(/Password/);
// 	const firstNameInput = screen.getByLabelText(/First Name/);
// 	const lastNameInput = screen.getByLabelText(/Last Name/);
// 	const locationInput = screen.getByLabelText(/Location/);
// 	const submitBtn = screen.getByTestId('submit-client-reg');
// 	userEvent.type(emailInput, 'testio.testales@tmail.com');
// 	userEvent.type(passwordInput, 'test_password');
// 	userEvent.type(firstNameInput, 'Testio');
// 	userEvent.type(lastNameInput, 'Testales');
// 	userEvent.type(locationInput, 'San Diego');

// 	await userEvent.click(submitBtn);

// 	expect(projectService).toHaveBeenCalledWith(credentials);
// });
// });
