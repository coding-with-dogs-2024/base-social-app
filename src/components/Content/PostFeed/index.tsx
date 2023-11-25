import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';
import { PostCard } from './PostCard';
import { useImmer } from 'use-immer';
import type { PostList } from '../../../services/jsonapi/types';

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

	const previousPage = () =>
		setState((draft) => {
			if (previousPageAllowed(draft)) {
				draft.currentPage--;
			}
		});
	const nextPage = () =>
		setState((draft) => {
			if (nextPageAllowed(draft)) {
				draft.currentPage++;
			}
		});

	const updatePagination = (posts: PostList) =>
		setState((draft) => {
			draft.currentPage = 0;
			const remainder = posts.length % pageSize;
			draft.totalPages =
				Math.floor(posts.length / pageSize) + (remainder > 0 ? 1 : 0);
		});

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
	usePagination(10);
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
