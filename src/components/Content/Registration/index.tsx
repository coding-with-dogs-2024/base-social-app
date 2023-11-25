import classes from './Registration.module.scss';
import { Input } from '../../UI/Form/Input';
import { Radio } from '../../UI/Form/Radio';
import type { RadioOption } from '../../UI/Form/Radio';
import { Checkbox } from '../../UI/Form/Checkbox';
import { useImmer } from 'use-immer';
import type { ChangeEvent } from 'react';

const GENDER_OPTIONS: ReadonlyArray<RadioOption> = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'other', label: 'Other' }
];

type State = Readonly<{
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	dateOfBirth: string;
	gender: 'male' | 'female' | 'other';
	notifications: boolean;
	dailyPostLimit: number;
}>;

type UseRegistrationFormReturn = Readonly<{
	state: State;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
		password: ''
	});

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name as keyof State;
		const value = event.target.value;
		setState((draft) => {
			switch (name) {
				case 'dailyPostLimit':
					draft[name] = parseInt(value);
					break;
				case 'notifications':
					break;
				case 'gender':
					break;
				default:
					draft[name] = value;
					break;
			}
		});
	};

	return {
		state,
		onChange
	};
};

export const Registration = () => {
	const { state, onChange } = useRegistrationForm();
	return (
		<div className={classes.registration}>
			<h1>Registration</h1>
			{JSON.stringify(state)}
			<section>
				<h2>Credentials</h2>
				<div className={classes.row}>
					<Input
						type="text"
						name="email"
						labelText="Email"
						value={state.email}
						onChange={onChange}
					/>
					<Input
						type="password"
						name="password"
						labelText="Password"
						value={state.password}
						onChange={onChange}
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
						onChange={onChange}
					/>
					<Input
						type="text"
						name="lastName"
						labelText="Last Name"
						value={state.lastName}
						onChange={onChange}
					/>
				</div>
				<div className={classes.row}>
					<Input
						type="date"
						name="dateOfBirth"
						labelText="Date of Birth"
						value={state.dateOfBirth}
						onChange={onChange}
					/>
					<Radio
						labelText="Gender"
						name="gender"
						options={GENDER_OPTIONS}
					/>
				</div>
			</section>
			<section>
				<h2>App Settings</h2>
				<div className={classes.row}>
					<Checkbox
						name="notifications"
						labelText="Receive Notifications?"
					/>
					<Input
						type="number"
						name="postLimit"
						labelText="Daily Post Limit"
					/>
				</div>
			</section>
		</div>
	);
};
