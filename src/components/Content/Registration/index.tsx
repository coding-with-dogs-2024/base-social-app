import classes from './Registration.module.scss';
import { Input } from '../../UI/Form/Input';
import { Radio } from '../../UI/Form/Radio';
import { Checkbox } from '../../UI/Form/Checkbox';
import { useImmer } from 'use-immer';
import type { ChangeEvent } from 'react';
import type { FormOption } from '../../UI/Form/types';
import { Select } from '../../UI/Form/Select';

type Gender = 'male' | 'female' | 'other';
type UserType = 'standard' | 'admin';

const GENDER_OPTIONS: ReadonlyArray<FormOption<Gender>> = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'other', label: 'Other' }
];

const USER_TYPE_OPTIONS: ReadonlyArray<FormOption<UserType>> = [
	{ value: 'standard', label: 'Standard' },
	{ value: 'admin', label: 'Admin' }
];

type State = Readonly<{
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	dateOfBirth: string;
	gender: Gender;
	notifications: boolean;
	dailyPostLimit: number;
	userType: UserType;
}>;

type UseRegistrationFormReturn = Readonly<{
	state: State;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}>;

const useRegistrationForm = (): UseRegistrationFormReturn => {
	const [state, setState] = useImmer<State>({
		firstName: '',
		lastName: '',
		dailyPostLimit: 0,
		dateOfBirth: '',
		email: '',
		gender: 'male',
		notifications: true,
		password: '',
		userType: 'standard'
	});

	const onChange = (name: keyof State, value: string, checked: boolean) => {
		setState((draft) => {
			switch (name) {
				case 'dailyPostLimit':
					draft[name] = parseInt(value);
					break;
				case 'notifications':
					draft[name] = checked;
					break;
				case 'gender':
					draft[name] = value as Gender;
					break;
				case 'userType':
					draft[name] = value as UserType;
					break;
				default:
					draft[name] = value;
					break;
			}
		});
	};

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name as keyof State;
		const value = event.target.value;
		const checked = event.target.checked;
		onChange(name, value, checked);
	};

	const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const name = event.target.name as keyof State;
		const value = event.target.value;
		onChange(name, value, false);
	};

	return {
		state,
		onInputChange,
		onSelectChange
	};
};

export const Registration = () => {
	const { state, onInputChange, onSelectChange } = useRegistrationForm();
	return (
		<div className={classes.registration}>
			<h1>Registration</h1>
			<section>
				<h2>Credentials</h2>
				<div className={classes.row}>
					<Input
						type="text"
						name="email"
						labelText="Email"
						value={state.email}
						onChange={onInputChange}
					/>
					<Input
						type="password"
						name="password"
						labelText="Password"
						value={state.password}
						onChange={onInputChange}
					/>
				</div>
			</section>
			<section>
				<h2>Personal Information</h2>
				<div className={classes.row}>
					<Input
						type="text"
						name="firstName"
						labelText="First Name"
						value={state.firstName}
						onChange={onInputChange}
					/>
					<Input
						type="text"
						name="lastName"
						labelText="Last Name"
						value={state.lastName}
						onChange={onInputChange}
					/>
				</div>
				<div className={classes.row}>
					<Input
						type="date"
						name="dateOfBirth"
						labelText="Date of Birth"
						value={state.dateOfBirth}
						onChange={onInputChange}
					/>
					<Radio
						labelText="Gender"
						name="gender"
						options={GENDER_OPTIONS}
						selected={state.gender}
						onChange={onInputChange}
					/>
				</div>
			</section>
			<section>
				<h2>App Settings</h2>
				<div className={classes.row}>
					<Checkbox
						name="notifications"
						labelText="Receive Notifications?"
						checked={state.notifications}
						onChange={onInputChange}
					/>
					<Input
						type="number"
						name="dailyPostLimit"
						labelText="Daily Post Limit"
						value={state.dailyPostLimit}
						onChange={onInputChange}
					/>
				</div>
				<div className={classes.row}>
					<Select
						labelText="User Type"
						options={USER_TYPE_OPTIONS}
						name="userType"
						selected={state.userType}
						onChange={onSelectChange}
					/>
				</div>
			</section>
		</div>
	);
};
