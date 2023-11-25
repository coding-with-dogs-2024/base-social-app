import type { UseQueryResult } from '@tanstack/react-query';

export const createLoadedUseQueryResult = <T>(data: T): UseQueryResult<T> => ({
	data,
	isLoadingError: false,
	isLoading: false,
	error: null,
	isRefetchError: false,
	fetchStatus: 'idle',
	isSuccess: true,
	status: 'success',
	refetch: vi.fn(),
	isRefetching: false,
	isStale: false,
	isPlaceholderData: false,
	isFetchedAfterMount: false,
	isFetching: false,
	failureReason: null,
	isError: false,
	failureCount: 0,
	errorUpdatedAt: 0,
	dataUpdatedAt: 0,
	isPending: false,
	isPaused: false,
	isFetched: true,
	errorUpdateCount: 0,
	isInitialLoading: false
});

export const createIsLoadingUseQueryResult = <T>(): UseQueryResult<T> => ({
	isLoading: true,
	data: undefined,
	error: null,
	isError: false,
	isFetched: false,
	isPaused: false,
	isPending: true,
	dataUpdatedAt: 0,
	errorUpdateCount: 0,
	errorUpdatedAt: 0,
	failureCount: 0,
	failureReason: null,
	fetchStatus: 'fetching',
	isFetching: true,
	isLoadingError: false,
	isFetchedAfterMount: false,
	isPlaceholderData: false,
	isStale: false,
	isRefetching: false,
	refetch: vi.fn(),
	status: 'pending',
	isSuccess: false,
	isRefetchError: false,
	isInitialLoading: false
});