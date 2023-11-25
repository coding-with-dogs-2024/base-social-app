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

		const genderMaleInput = screen.getByLabelText('Male');
		const genderFemaleInput = screen.getByLabelText('Female');
		const genderOtherInput = screen.getByLabelText('Other');

		expect(genderMaleInput).toBeChecked();
		expect(genderFemaleInput).not.toBeChecked();
		expect(genderOtherInput).not.toBeChecked();

		await userEvent.click(genderFemaleInput);
		expect(genderMaleInput).not.toBeChecked();
		expect(genderFemaleInput).toBeChecked();
		expect(genderOtherInput).not.toBeChecked();

		await userEvent.click(genderOtherInput);
		expect(genderMaleInput).not.toBeChecked();
		expect(genderFemaleInput).not.toBeChecked();
		expect(genderOtherInput).toBeChecked();

		const notificationInput = screen.getByLabelText(
			'Receive Notifications?'
		);
		expect(notificationInput).toBeChecked();
		await userEvent.click(notificationInput);
		expect(notificationInput).not.toBeChecked();

		const dailyPostInput = screen.getByLabelText('Daily Post Limit');
		await userEvent.type(dailyPostInput, '20');
		expect(dailyPostInput).toHaveValue(20);

		const userTypeSelect = screen.getByLabelText('User Type');
		expect(userTypeSelect).toHaveValue('standard');
		await userEvent.selectOptions(userTypeSelect, 'admin');
		expect(userTypeSelect).toHaveValue('admin');
	});
});
