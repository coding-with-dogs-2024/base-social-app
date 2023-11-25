import { render, screen } from '@testing-library/react';
import { InjectablePostFeed } from '../../../../src/components/Content/PostFeed';
import type { MockedFunction } from 'vitest';
import { useGetAllPosts } from '../../../../src/services/jsonapi/api';
import type { PostList } from '../../../../src/services/jsonapi/types';

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
	});

	it('shows post list from data', () => {
		useGetAllPostsMock.mockReturnValue({
			isLoading: false,
			data: posts
		});
		render(<InjectablePostFeed useGetAllPosts={useGetAllPostsMock} />);

		expect(
			screen.getByRole('heading', {
				name: 'Post Feed'
			})
		).toBeVisible();
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
	});
});
