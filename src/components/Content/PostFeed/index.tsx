import classes from './PostFeed.module.scss';
// import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';

export const PostFeed = () => {
	// useGetAllPosts();
	return (
		<div className={classes.postFeed}>
			<p>Hello</p>
			<p>World</p>
			<Spinner />
		</div>
	);
};
