import { z } from 'zod';

export const postSchema = z.object({
	userId: z.number(),
	id: z.number(),
	title: z.string(),
	body: z.string()
});

export type Post = z.infer<typeof postSchema>;

export const postListSchema = z.array(postSchema).readonly();

export type PostList = z.infer<typeof postListSchema>;

export const userSchema = z
	.object({
		id: z.number(),
		name: z.string(),
		email: z.string(),
		address: z
			.object({
				street: z.string(),
				suite: z.string(),
				city: z.string(),
				zipcode: z.string(),
				geo: z
					.object({
						lat: z.string(),
						lng: z.string()
					})
					.readonly()
			})
			.readonly(),
		phone: z.string(),
		website: z.string(),
		company: z
			.object({
				name: z.string(),
				catchPhrase: z.string(),
				bs: z.string()
			})
			.readonly()
	})
	.readonly();

export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema).readonly();
export type UserList = z.infer<typeof userListSchema>;

export const commentSchema = z
	.object({
		postId: z.number(),
		id: z.number(),
		name: z.string(),
		email: z.string(),
		body: z.string()
	})
	.readonly();
export type Comment = z.infer<typeof commentSchema>;

export const commentListSchema = z.array(commentSchema).readonly();
export type CommentList = z.infer<typeof commentListSchema>;
