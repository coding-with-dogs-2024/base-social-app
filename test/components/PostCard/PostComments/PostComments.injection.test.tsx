import type { CommentList } from '../../../../src/services/jsonapi/types';
import { render, screen, within } from '@testing-library/react';
import { PostCommentsWithInjection } from '../../../../src/components/PostCard/PostComments';
import type { MockedFunction } from 'vitest';
import { useGetAllCommentsForPost as useGetAllCommentsForPostDefault } from '../../../../src/services/jsonapi/api';

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

describe('PostComments', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('renders loading spinner', () => {
		useGetAllCommentsForPost.mockReturnValue({
			isLoading: true,
			data: undefined
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

	it('renders comments', () => {
		useGetAllCommentsForPost.mockReturnValue({
			isLoading: false,
			data: comments
		});
		render(
			<PostCommentsWithInjection
				postId={POST_ID}
				useGetAllCommentsForPost={useGetAllCommentsForPost}
			/>
		);
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

		const commentElements = screen.getAllByTestId('comment');
		expect(commentElements).toHaveLength(2);

		expect(
			within(commentElements[0]).getByText('first@gmail.com')
		).toBeVisible();
		expect(
			within(commentElements[0]).getByText('This is the first post')
		).toBeVisible();

		expect(
			within(commentElements[1]).getByText('second@gmail.com')
		).toBeVisible();
		expect(
			within(commentElements[1]).getByText('This is the second post')
		).toBeVisible();
	});
});
