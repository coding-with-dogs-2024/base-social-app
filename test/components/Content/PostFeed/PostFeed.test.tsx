import { render, screen } from '@testing-library/react';
import { InjectablePostFeed } from '../../../../src/components/Content/PostFeed';
import type { MockedFunction } from 'vitest';
import { useGetAllPosts } from '../../../../src/services/jsonapi/api';
import type { PostList } from '../../../../src/services/jsonapi/types';
import type { PostCardProps } from '../../../../src/components/PostCard';
import { PostCard } from '../../../../src/components/PostCard';

const useGetAllPostsMock: MockedFunction<typeof useGetAllPosts> = vi.fn();

const posts: PostList = [
	{
		id: 1,
		userId: 1,
		title: 'First Post',
		body: 'This is the first post'
	},
	{
		id: 2,
		userId: 1,
		title: 'Second Post',
		body: 'This is the second post'
	}
];

const MockPostCard: typeof PostCard = (props: PostCardProps) => (
	<div data-testid="post-card">Post ID: {props.post.id}</div>
);

describe('PostFeed', () => {
	beforeEach(() => {
		useGetAllPostsMock.mockReset();
	});
	it('shows loading spinner when waiting on posts to load', () => {
		useGetAllPostsMock.mockReturnValue({
			isLoading: true,
			data: undefined
		});
		render(<InjectablePostFeed useGetAllPosts={useGetAllPostsMock} />);

		expect(
			screen.getByRole('heading', {
				name: 'Post Feed'
			})
		).toBeVisible();
		expect(screen.getByRole('progressbar')).toBeVisible();

		expect(screen.queryAllByTestId('post-card')).toHaveLength(0);
		expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
	});

	it('shows post list from data', () => {
		useGetAllPostsMock.mockReturnValue({
			isLoading: false,
			data: posts
		});
		// In lesson, add the query client and show another error
		render(
			<InjectablePostFeed
				useGetAllPosts={useGetAllPostsMock}
				PostCard={MockPostCard}
			/>
		);

		expect(
			screen.getByRole('heading', {
				name: 'Post Feed'
			})
		).toBeVisible();
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
		expect(screen.getByTestId('pagination')).toBeVisible();
		const postCards = screen.getAllByTestId('post-card');
		expect(postCards).toHaveLength(2);
		expect(postCards[0]).toHaveTextContent('Post ID: 1');
		expect(postCards[1]).toHaveTextContent('Post ID: 2');
	});
});
