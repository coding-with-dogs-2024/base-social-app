import { useImmer } from 'use-immer';
import { useCallback } from 'react';
import type { UsePaginationReturn } from './types';

type PaginationState = Readonly<{
	currentPage: number;
	totalPages: number;
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
		updatePagination,
		extractPage,
		componentProps: {
			showPreviousPage: state.currentPage !== 0,
			showNextPage: state.currentPage < state.totalPages - 1,
			previousPage,
			nextPage
		}
	};
};
