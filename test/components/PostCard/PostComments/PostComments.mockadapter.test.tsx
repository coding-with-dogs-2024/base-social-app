import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import type { CommentList } from '../../../../src/services/jsonapi/types';
import { HOST } from '../../../../src/services/jsonapi/api';
import { renderWithQueryClient } from '../../../_testutils_/renderWithWrapper';
import { PostComments } from '../../../../src/components/PostCard/PostComments';
import { screen, within } from '@testing-library/react';

const POST_ID: number = 1;

const mockApi = new MockAdapter(axios);

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

describe('PostComments', () => {
	beforeEach(() => {
		mockApi.reset();
	});
	it('renders the comments', async () => {
		mockApi.onGet(`${HOST}/posts/${POST_ID}/comments`).reply(200, comments);

		renderWithQueryClient(<PostComments postId={POST_ID} />);
		expect(screen.getByRole('progressbar')).toBeVisible();

		const commentElements = await screen.findAllByTestId('comment');
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