import classes from './UserProfile.module.scss';
import { useParams } from 'react-router';
import {
	useGetAllPostsForUser,
	useGetUserById
} from '../../../services/jsonapi/api';
import { useMemo } from 'react';
import { CircleSpinner } from '../../UI/Spinner/Circle';
import { UserInfo } from './UserInfo';
import { PostCard } from '../../PostCard';

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
	const { isLoading: userIsLoading, data: userData } = useGetUserById(userId);
	const { isLoading: postsIsLoading, data: postsData } =
		useGetAllPostsForUser(userId);
	const isLoading = userIsLoading || postsIsLoading;
	return (
		<div className={classes.userProfile}>
			<div className={classes.profileTitle}>
				<h1>User Profile</h1>
			</div>
			{isLoading && <CircleSpinner />}
			{!isLoading && (
				<div className={classes.profileContent}>
					{userData && <UserInfo user={userData} />}
					{postsData && (
						<>
							<h2>Posts</h2>
							{postsData.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
};
