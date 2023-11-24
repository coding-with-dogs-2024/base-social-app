import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';
import { PostCard } from './PostCard';
import { useEffect } from 'react';
import { usePagination } from '../../common/usePagination';

const PAGE_SIZE = 10;

export const PostFeed = () => {
	const { updatePagination, extractPage } = usePagination(PAGE_SIZE);
	const { isLoading, data } = useGetAllPosts();

	useEffect(() => {
		if (data) {
			updatePagination(data);
		}
	}, [data, updatePagination]);

	return (
		<div className={classes.postFeed}>
			<h1>Post Feed</h1>
			{isLoading && <Spinner />}
			<div className={classes.postList}></div>
			{data &&
				extractPage(data).map((post) => (
					<PostCard key={post.id} post={post} />
				))}
		</div>
	);
};
