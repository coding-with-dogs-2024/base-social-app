import { render, screen } from '@testing-library/react';
import { InjectablePostFeed } from '../../../../src/components/Content/PostFeed';
import type { MockedFunction } from 'vitest';
import { useGetAllPosts } from '../../../../src/services/jsonapi/api';

const useGetAllPostsMock: MockedFunction<typeof useGetAllPosts> = vi.fn();

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

	it.fails('shows post list from data');
});
