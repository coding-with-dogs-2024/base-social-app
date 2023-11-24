import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';

export const PostFeed = () => {
	useGetAllPosts();
	return (
		<div className={classes.postFeed}>
			<p>Hello</p>
			<p>World</p>
		</div>
	);
};
