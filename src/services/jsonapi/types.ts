import { z } from 'zod';

export const postSchema = z.object({
	userId: z.number().readonly(),
	id: z.number().readonly(),
	title: z.string().readonly(),
	body: z.string().readonly()
});

export type Post = z.infer<typeof postSchema>;

export const postListSchema = z.array(postSchema).readonly();

export type PostList = z.infer<typeof postListSchema>;

export const userSchema = z.object({
	id: z.number().readonly(),
	name: z.string().readonly(),
	email: z.string().readonly(),
	address: z
		.object({
			street: z.string().readonly(),
			suite: z.string().readonly(),
			city: z.string().readonly(),
			zipcode: z.string().readonly(),
			geo: z
				.object({
					lat: z.string().readonly(),
					lng: z.string().readonly()
				})
				.readonly()
		})
		.readonly(),
	phone: z.string().readonly(),
	website: z.string().readonly(),
	company: z
		.object({
			name: z.string().readonly(),
			catchPhrase: z.string().readonly(),
			bs: z.string().readonly()
		})
		.readonly()
});

export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema).readonly();
export type UserList = z.infer<typeof userListSchema>;
