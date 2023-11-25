import type { User } from '../../../../services/jsonapi/types';
import classes from './UserInfo.module.scss';
import { Card } from '../../../UI/Card';

type UserInfoProps = Readonly<{
	user: User;
}>;

type RowProps = Readonly<{
	label: string;
	value: string;
}>;

const Row = (props: RowProps) => (
	<div className={classes.row}>
		<p>
			<strong>{props.label}:</strong>
		</p>
		<p>{props.value}</p>
	</div>
);

export const UserInfo = (props: UserInfoProps) => {
	const {
		address: { street, suite, city, zipcode }
	} = props.user;
	const addressString = `${street}, ${suite}, ${city} ${zipcode}`;
	return (
		<Card
			title={<h2 className={classes.userInfoTitle}>{props.user.name}</h2>}
			body={
				<div className={classes.userInfoContent}>
					<Row label="Email" value={props.user.email} />
					<Row label="Address" value={addressString} />
					<Row label="Phone" value={props.user.phone} />
					<Row label="Website" value={props.user.website} />
					<Row label="Company" value={props.user.company.name} />
				</div>
			}
		/>
	);
};
