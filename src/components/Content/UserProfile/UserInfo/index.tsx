import type { User } from '../../../../services/jsonapi/types';
import classes from './UserInfo.module.scss';

type Props = Readonly<{
	user: User;
}>;

export const UserInfo = (props: Props) => (
	<div className={classes.userInfo}>
		<div className={classes.row}>
			<p>
				<strong>Email:</strong>
			</p>
			<p>{props.user.email}</p>
		</div>
	</div>
);
