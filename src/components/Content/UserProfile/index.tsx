import classes from './UserProfile.module.scss';
import { useParams } from 'react-router';
import { useGetUserById } from '../../../services/jsonapi/api';
import { useMemo } from 'react';

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
	useGetUserById(userId);
	return (
		<div className={classes.userProfile}>
			<h1>User Profile</h1>
		</div>
	);
};
