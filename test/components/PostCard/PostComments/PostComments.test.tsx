import { http, HttpHandler, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { HOST } from '../../../../src/services/jsonapi/api';
import type { CommentList } from '../../../../src/services/jsonapi/types';
import { render } from '@testing-library/react';
import { PostComments } from '../../../../src/components/PostCard/PostComments';

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
		const postId = /^.+\/posts\/(\d+)\/comments$/.exec(request.url)
			?.groups?.[0];
		if (postId && parseInt(postId) === POST_ID) {
			return HttpResponse.json(comments);
		}
		return [];
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
	it('renders and loads comments', () => {
		render(<PostComments postId={POST_ID} />);
	});
});
