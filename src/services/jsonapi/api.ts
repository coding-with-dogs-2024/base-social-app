import type { Post } from './types';
import { postSchema } from './types';

const HOST = 'https://jsonplaceholder.typicode.com';

export const getAllPosts = (): Promise<Post> =>
	fetch(`${HOST}/posts`)
		.then((res) => res.json())
		.then((json) => postSchema.parse(json));
