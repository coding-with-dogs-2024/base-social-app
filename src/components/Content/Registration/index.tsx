import classes from './Registration.module.scss';
import { Input } from '../../UI/Input';

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
	</div>
);
