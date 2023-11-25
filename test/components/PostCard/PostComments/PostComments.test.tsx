import { http, HttpHandler, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { HOST } from '../../../../src/services/jsonapi/api';
import type { CommentList } from '../../../../src/services/jsonapi/types';
import { screen } from '@testing-library/react';
import { PostComments } from '../../../../src/components/PostCard/PostComments';
import { renderWithQueryClient } from '../../../_testutils_/renderWithWrapper';

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

const handlers: ReadonlyArray<HttpHandler> = [
	http.get(`${HOST}/posts/${POST_ID}/comments`, ({ request }) => {
		const postId = /^.+\/posts\/(?<postId>\d+)\/comments$/.exec(request.url)
			?.groups?.postId;
		if (postId && parseInt(postId) === POST_ID) {
			return HttpResponse.json(comments);
		}
		return HttpResponse.json([]);
	})
];

const server = setupServer(...handlers);

describe('PostComments', () => {
	beforeAll(() => {
		server.listen();
	});
	beforeEach(() => {
		server.resetHandlers();
	});
	afterAll(() => {
		server.close();
	});
	it('renders and loads comments', async () => {
		renderWithQueryClient(<PostComments postId={POST_ID} />);
		const progressbar = await screen.findByRole('progressbar');
		expect(progressbar).toBeVisible();

		const firstComment = await screen.findByText('This is the first post');
		expect(firstComment).toBeVisible();
		expect(screen.getByText('first@gmail.com')).toBeVisible();

		expect(screen.getByText('This is the second post')).toBeVisible();
		expect(screen.getByText('second@gmail.com')).toBeVisible();
	});
});
