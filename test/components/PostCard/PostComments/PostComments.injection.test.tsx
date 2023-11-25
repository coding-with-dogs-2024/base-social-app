import type { CommentList } from '../../../../src/services/jsonapi/types';
import { render, screen, within } from '@testing-library/react';
import { PostCommentsWithInjection } from '../../../../src/components/PostCard/PostComments';
import { renderWithQueryClient } from '../../../_testutils_/renderWithWrapper';
import type { MockedFunction } from 'vitest';
import { useGetAllCommentsForPost as useGetAllCommentsForPostDefault } from '../../../../src/services/jsonapi/api';
import type { UseQueryResult } from '@tanstack/react-query';

const POST_ID: number = 1;

const comments: CommentList = [
	{
		postId: POST_ID,
		name: 'First Post',
		id: 1,
		body: 'This is the first post',
		email: 'first@gmail.com'
	},
	{
		postId: POST_ID,
		name: 'Second Post',
		id: 2,
		body: 'This is the second post',
		email: 'second@gmail.com'
	}
];

const useGetAllCommentsForPost: MockedFunction<
	typeof useGetAllCommentsForPostDefault
> = vi.fn();

const createMockUseQueryResult = <T extends object>(): UseQueryResult<T> => ({
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

describe('PostComments', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('renders loading spinner', () => {
		useGetAllCommentsForPost.mockReturnValue({
			...createMockUseQueryResult<CommentList>(),
			isLoading: true
		});
		render(
			<PostCommentsWithInjection
				postId={POST_ID}
				useGetAllCommentsForPost={useGetAllCommentsForPost}
			/>
		);
		expect(screen.getByRole('progressbar')).toBeVisible();
		expect(screen.queryAllByTestId('comment')).toHaveLength(0);
	});

	it('renders comments', () => {});

	it('renders and loads comments', async () => {
		renderWithQueryClient(<PostCommentsWithInjection postId={POST_ID} />);
		expect(screen.getByRole('progressbar')).toBeVisible();

		const comments = await screen.findAllByTestId('comment');
		expect(comments).toHaveLength(2);

		expect(within(comments[0]).getByText('first@gmail.com')).toBeVisible();
		expect(
			within(comments[0]).getByText('This is the first post')
		).toBeVisible();

		expect(within(comments[1]).getByText('second@gmail.com')).toBeVisible();
		expect(
			within(comments[1]).getByText('This is the second post')
		).toBeVisible();
	});
});
