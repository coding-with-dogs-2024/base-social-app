import classes from './PostFeed.module.scss';
import { useGetAllPosts } from '../../../services/jsonapi/api';
import { Spinner } from '../../UI/Spinner';
import { PostCard } from './PostCard';
import { useImmer } from 'use-immer';

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
}>;

const previousPageAllowed = (state: PaginationState): boolean =>
	state.currentPage !== 0;
const nextPageAllowed = (state: PaginationState): boolean =>
	state.currentPage < state.totalPages - 1;

const usePagination = (): UsePaginationReturn => {
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

	return {
		paginationState: state,
		showPreviousPage: state.currentPage !== 0,
		showNextPage: state.currentPage < state.totalPages - 1,
		previousPage,
		nextPage
	};
};

export const PostFeed = () => {
	usePagination();
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
