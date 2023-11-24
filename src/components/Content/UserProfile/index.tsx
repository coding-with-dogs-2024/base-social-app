import classes from './UserProfile.module.scss';
import { useParams } from 'react-router';
import { useGetUserById } from '../../../services/jsonapi/api';
import { useMemo } from 'react';
import { CircleSpinner } from '../../UI/Spinner/Circle';
import { UserInfo } from './UserInfo';

type Params = Readonly<{
	id: string;
}>;

const useGetUserId = (): number => {
	const params = useParams<Params>();
	return useMemo(() => {
		if (params.id) {
			return parseInt(params.id);
		}
		return 0;
	}, [params]);
};

export const UserProfile = () => {
	const userId = useGetUserId();
	const { isLoading, data: userData } = useGetUserById(userId);
	return (
		<div className={classes.userProfile}>
			<div className={classes.profileTitle}>
				<h1>User Profile</h1>
			</div>
			{isLoading && <CircleSpinner />}
			<div className={classes.profileContent}>
				{userData && <UserInfo user={userData} />}
			</div>
		</div>
	);
};
