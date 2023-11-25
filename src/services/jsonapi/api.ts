import type { CommentList, Post, PostList, User } from './types';
import { commentListSchema, postListSchema, userSchema } from './types';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult, DefaultError } from '@tanstack/react-query';

const HOST = 'https://jsonplaceholder.typicode.com';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const GET_USER_BY_ID = 'GET_USER_BY_ID';
const GET_ALL_POSTS_FOR_USER = 'GET_ALL_POSTS_FOR_USER';
const GET_ALL_COMMENTS_FOR_POST = 'GET_ALL_COMMENTS_FOR_POST';

/**
 * The JSON Placeholder API returns the posts in too elegant of
 * an order. This mixes them up to make things look more natural.
 */
const reOrderPosts = (posts: PostList): PostList => {
	const filterGroup =
		(groupNumber: number) =>
		(p: Post, index: number): boolean =>
			index % 3 === groupNumber;
	const group1 = posts.filter(filterGroup(0));
	const group2 = posts.filter(filterGroup(1));
	const group3 = posts.filter(filterGroup(2));
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
		queryFn: ({ signal, queryKey: [, userIdParam] }) =>
			fetch(`${HOST}/users/${userIdParam}`, {
				signal
			})
				.then((res) => res.json())
				.then(userSchema.parse),
		enabled: userId > 0
	});

type GetAllPostsForUserKey = [typeof GET_ALL_POSTS_FOR_USER, number];
export const useGetAllPostsForUser = (
	userId: number
): UseQueryResult<PostList> =>
	useQuery<PostList, DefaultError, PostList, GetAllPostsForUserKey>({
		queryKey: [GET_ALL_POSTS_FOR_USER, userId],
		queryFn: ({ signal, queryKey: [, userIdParam] }) =>
			fetch(`${HOST}/posts?userId=${userIdParam}`, {
				signal
			})
				.then((res) => res.json())
				.then(postListSchema.parse)
	});

type GetAllCommentsForPostKey = [typeof GET_ALL_COMMENTS_FOR_POST, number];
export const useGetAllCommentsForPost = (
	postId: number
): UseQueryResult<CommentList> =>
	useQuery<CommentList, DefaultError, CommentList, GetAllCommentsForPostKey>({
		queryKey: [GET_ALL_COMMENTS_FOR_POST, postId],
		queryFn: ({ signal, queryKey: [, postIdParam] }) =>
			fetch(`${HOST}/posts/${postIdParam}/comments`, {
				signal
			})
				.then((res) => res.json())
				.then(commentListSchema.parse),
		enabled: postId > 0
	});
