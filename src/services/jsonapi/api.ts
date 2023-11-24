import type { Post, PostList, User } from './types';
import { postListSchema, userSchema } from './types';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult, DefaultError } from '@tanstack/react-query';

const HOST = 'https://jsonplaceholder.typicode.com';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';

export const useGetAllPosts = (): UseQueryResult<ReadonlyArray<Post>> =>
	useQuery<PostList>({
		queryKey: [GET_ALL_POSTS],
		queryFn: ({ signal }) =>
			fetch(`${HOST}/posts`, {
				signal
			})
				.then((res) => res.json())
				.then(postListSchema.parse)
	});

type GetUserByIdQueryKey = [typeof GET_USER_BY_ID, number];
export const useGetUserById = (userId: number): UseQueryResult<User> =>
	useQuery<User, DefaultError, User, GetUserByIdQueryKey>({
		queryKey: [GET_USER_BY_ID, userId],
		queryFn: ({ signal, queryKey: [, userId] }) =>
			fetch(`${HOST}/users/${userId}`, {
				signal
			})
				.then((res) => res.json())
				.then(userSchema.parse)
	});
