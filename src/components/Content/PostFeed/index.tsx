import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';
import { Card } from '../../UI/Card';

export const PostFeed = () => {
	const { isLoading } = useGetAllPosts();
	return (
		<div className={classes.postFeed}>
			<h1>Post Feed</h1>
			{isLoading && <Spinner />}
			<div className={classes.postList}>
				<Card title={<p>Title</p>} body={<p>Lorem Ipsum</p>} />
			</div>
		</div>
	);
};
