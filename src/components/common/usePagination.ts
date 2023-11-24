import { useImmer } from 'use-immer';
import { useCallback } from 'react';

export type PaginationState = Readonly<{
	currentPage: number;
	totalPages: number;
}>;

export type UsePaginationReturn<T> = Readonly<{
	paginationState: PaginationState;
	showPreviousPage: boolean;
	showNextPage: boolean;
	previousPage: () => void;
	nextPage: () => void;
	updatePagination: (posts: ReadonlyArray<T>) => void;
	extractPage: (posts: ReadonlyArray<T>) => ReadonlyArray<T>;
}>;

const previousPageAllowed = (state: PaginationState): boolean =>
	state.currentPage !== 0;
const nextPageAllowed = (state: PaginationState): boolean =>
	state.currentPage < state.totalPages - 1;

export const usePagination = <T>(pageSize: number): UsePaginationReturn<T> => {
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
		(items: ReadonlyArray<T>) =>
			setState((draft) => {
				draft.currentPage = 0;
				const remainder = items.length % pageSize;
				draft.totalPages =
					Math.floor(items.length / pageSize) +
					(remainder > 0 ? 1 : 0);
			}),
		[setState, pageSize]
	);

	const extractPage = useCallback(
		(items: ReadonlyArray<T>) =>
			items.slice(state.currentPage * pageSize, pageSize),
		[state, pageSize]
	);

	return {
		paginationState: state,
		showPreviousPage: state.currentPage !== 0,
		showNextPage: state.currentPage < state.totalPages - 1,
		previousPage,
		nextPage,
		updatePagination,
		extractPage
	};
};
