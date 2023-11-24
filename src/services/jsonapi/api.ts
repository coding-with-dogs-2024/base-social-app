import type { Post, PostList, User } from './types';
import { postListSchema, userSchema } from './types';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult, DefaultError } from '@tanstack/react-query';

const HOST = 'https://jsonplaceholder.typicode.com';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';

/**
 * The JSON Placeholder API returns the posts in too elegant of
 * an order. This mixes them up to make things look more natural.
 */
const reOrderPosts = (posts: PostList): PostList => {
	const group1 = posts.filter((post, index) => index % 3 === 0);
	const group2 = posts.filter((post, index) => index % 3 === 1);
	const group3 = posts.filter((post, index) => index % 3 === 2);
	return group1.concat(group2).concat(group3);
};

export const useGetAllPosts = (): UseQueryResult<ReadonlyArray<Post>> =>
	useQuery<PostList>({
		queryKey: [GET_ALL_POSTS],
		queryFn: ({ signal }) =>
			fetch(`${HOST}/posts`, {
				signal
			})
				.then((res) => res.json())
				.then(postListSchema.parse)
				.then(reOrderPosts)
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
