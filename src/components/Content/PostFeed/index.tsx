import classes from './PostFeed.module.scss';
import {
	useGetAllPosts,
	useGetAllPosts as useGetAllPostsDefault
} from '../../../services/jsonapi/api';
import { CircleSpinner } from '../../UI/Spinner/Circle';
import { PostCard } from '../../PostCard';
import { useEffect, useMemo } from 'react';
import { usePagination } from '../../UI/Pagination/usePagination';
import type { Post } from '../../../services/jsonapi/types';
import { Pagination } from '../../UI/Pagination';

type Props = Readonly<{
	useGetAllPosts?: typeof useGetAllPostsDefault;
}>;

export const PostFeed = () => {
	const { updatePagination, extractPage, componentProps } =
		usePagination<Post>(10);
	const { isLoading, data } = useGetAllPosts();

	useEffect(() => {
		if (data) {
			updatePagination(data);
		}
	}, [data, updatePagination]);

	const dataPage = useMemo(() => {
		if (!data) {
			return [];
		}
		return extractPage(data);
	}, [data, extractPage]);

	return (
		<div className={classes.postFeed}>
			<h1>Post Feed</h1>
			{isLoading && <CircleSpinner />}
			{!isLoading && (
				<div className={classes.postList}>
					{data &&
						dataPage.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					<Pagination {...componentProps} />
				</div>
			)}
		</div>
	);
};

export const InjectablePostFeed = ({
	useGetAllPosts = useGetAllPostsDefault
}: Props) => {
	const { updatePagination, extractPage, componentProps } =
		usePagination<Post>(10);
	const { isLoading, data } = useGetAllPosts();

	useEffect(() => {
		if (data) {
			updatePagination(data);
		}
	}, [data, updatePagination]);

	const dataPage = useMemo(() => {
		if (!data) {
			return [];
		}
		return extractPage(data);
	}, [data, extractPage]);

	return (
		<div className={classes.postFeed}>
			<h1>Post Feed</h1>
			{isLoading && <CircleSpinner />}
			{!isLoading && (
				<div className={classes.postList}>
					{data &&
						dataPage.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					<Pagination {...componentProps} />
				</div>
			)}
		</div>
	);
};
