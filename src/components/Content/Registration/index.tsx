import classes from './Registration.module.scss';
import { Input } from '../../UI/Form/Input';
import { Radio } from '../../UI/Form/Radio';
import type { RadioOption } from '../../UI/Form/Radio';

/*
 * First Name
 * Last Name
 * Email
 * Password (Password)
 * Date of Birth (Date)
 * Gender (Radio)
 * Receive Notifications? (Checkbox)
 * Daily Post Limit (number)
 */

const GENDER_OPTIONS: ReadonlyArray<RadioOption> = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'other', label: 'Other' }
];

export const Registration = () => (
	<div className={classes.registration}>
		<h1>Registration</h1>
		<section>
			<h2>Credentials</h2>
			<div className={classes.row}>
				<Input type="text" name="email" labelText="Email" />
				<Input type="password" name="password" labelText="Password" />
			</div>
		</section>
		<section>
			<h2>Personal Information</h2>
			<div className={classes.row}>
				<Input type="text" name="firstName" labelText="First Name" />
				<Input type="text" name="lastName" labelText="Last Name" />
			</div>
			<div className={classes.row}>
				<Input
					type="date"
					name="dateOfBirth"
					labelText="Date of Birth"
				/>
				<Radio
					labelText="Gender"
					name="gender"
					options={GENDER_OPTIONS}
				/>
			</div>
		</section>
	</div>
);
