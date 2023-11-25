import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';
import { PostCard } from './PostCard';
import { useEffect } from 'react';
import { usePagination } from '../../UI/Pagination/usePagination';
import type { Post } from '../../../services/jsonapi/types';
import { Pagination } from '../../UI/Pagination';

const PAGE_SIZE = 10;

export const PostFeed = () => {
	const { updatePagination, extractPage, componentProps } =
		usePagination<Post>(PAGE_SIZE);
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
			<div className={classes.postList}>
				{data &&
					extractPage(data).map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				<Pagination {...componentProps} />
			</div>
		</div>
	);
};
