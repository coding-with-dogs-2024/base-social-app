import type { Post, PostList } from './types';
import { postListSchema } from './types';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

const HOST = 'https://jsonplaceholder.typicode.com';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';

export const useGetAllPosts = (): UseQueryResult<ReadonlyArray<Post>> =>
	useQuery<PostList>({
		queryKey: [GET_ALL_POSTS],
		queryFn: ({ signal }) =>
			fetch(`${HOST}/posts`, {
				signal
			})
				.then((res) => res.json())
				.then((json) => postListSchema.parse(json))
	});
