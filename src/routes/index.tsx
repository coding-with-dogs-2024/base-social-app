import type { RouteObject } from 'react-router';
import { PostFeed } from '../components/Content/PostFeed';
import { Navigate } from 'react-router';

export const routes: RouteObject[] = [
	{
		path: '/post-feed',
		element: <PostFeed />
	},
	{
		path: '*',
		element: <Navigate to="/post-feed" />
	}
];
