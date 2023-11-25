import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';
import { PostCard } from './PostCard';
import { useImmer } from 'use-immer';
import type { PostList } from '../../../services/jsonapi/types';
import { useCallback, useEffect } from 'react';

type PaginationState = Readonly<{
	currentPage: number;
	totalPages: number;
}>;

type UsePaginationReturn = Readonly<{
	paginationState: PaginationState;
	showPreviousPage: boolean;
	showNextPage: boolean;
	previousPage: () => void;
	nextPage: () => void;
	updatePagination: (posts: PostList) => void;
}>;

const previousPageAllowed = (state: PaginationState): boolean =>
	state.currentPage !== 0;
const nextPageAllowed = (state: PaginationState): boolean =>
	state.currentPage < state.totalPages - 1;

const usePagination = (pageSize: number): UsePaginationReturn => {
	const [state, setState] = useImmer<PaginationState>({
		currentPage: 0,
		totalPages: 0
	});

	const previousPage = useCallback(
		() =>
			setState((draft) => {
				if (previousPageAllowed(draft)) {
					draft.currentPage--;
				}
			}),
		[setState]
	);

	const nextPage = useCallback(
		() =>
			setState((draft) => {
				if (nextPageAllowed(draft)) {
					draft.currentPage++;
				}
			}),
		[setState]
	);

	const updatePagination = useCallback(
		(posts: PostList) =>
			setState((draft) => {
				draft.currentPage = 0;
				const remainder = posts.length % pageSize;
				draft.totalPages =
					Math.floor(posts.length / pageSize) +
					(remainder > 0 ? 1 : 0);
			}),
		[setState, pageSize]
	);

	return {
		paginationState: state,
		showPreviousPage: state.currentPage !== 0,
		showNextPage: state.currentPage < state.totalPages - 1,
		previousPage,
		nextPage,
		updatePagination
	};
};

export const PostFeed = () => {
	const { updatePagination } = usePagination(10);
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
					data.map((post) => <PostCard key={post.id} post={post} />)}
			</div>
		</div>
	);
};
