import { z } from 'zod';

export const postSchema = z.object({
	userId: z.number().readonly(),
	id: z.number().readonly(),
	title: z.string().readonly(),
	body: z.string().readonly()
});

export type Post = z.infer<typeof postSchema>;
