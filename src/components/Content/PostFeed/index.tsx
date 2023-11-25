import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';
import { PostCard } from './PostCard';

export const PostFeed = () => {
	const { isLoading, data } = useGetAllPosts();
	return (
		<div className={classes.postFeed}>
			<h1>Post Feed</h1>
			{isLoading && <Spinner />}
			<div className={classes.postList}>
				{data &&
					data.map((post) => <PostCard key={post.id} post={post} />)}
			</div>
		</div>
	);
};
