import { render, screen } from '@testing-library/react';
import { Registration } from '../../../../src/components/Content/Registration';
import { userEvent } from '@testing-library/user-event';

describe('Registration', () => {
	it('can update all the controls', async () => {
		render(<Registration />);
		expect(
			screen.getByRole('heading', {
				level: 1
			})
		).toHaveTextContent('Registration');

		const sectionHeadings = screen.getAllByRole('heading', {
			level: 2
		});
		expect(sectionHeadings).toHaveLength(3);
		expect(sectionHeadings[0]).toHaveTextContent('Credentials');
		expect(sectionHeadings[1]).toHaveTextContent('Personal Information');
		expect(sectionHeadings[2]).toHaveTextContent('App Settings');

		const emailInput = screen.getByLabelText('Email');
		await userEvent.type(emailInput, 'user@gmail.com');
		expect(emailInput).toHaveValue('user@gmail.com');

		const passwordInput = screen.getByLabelText('Password');
		await userEvent.type(passwordInput, 'password');
		expect(passwordInput).toHaveValue('password');

		const firstNameInput = screen.getByLabelText('First Name');
		await userEvent.type(firstNameInput, 'John');
		expect(firstNameInput).toHaveValue('John');

		const lastNameInput = screen.getByLabelText('Last Name');
		await userEvent.type(lastNameInput, 'Doe');
		expect(lastNameInput).toHaveValue('Doe');

		const dateOfBirthInput = screen.getByLabelText('Date of Birth');
		// Point out this is counter-intuitive
		await userEvent.type(dateOfBirthInput, '2020-01-01');
		expect(dateOfBirthInput).toHaveValue('2020-01-01');
	});
});
