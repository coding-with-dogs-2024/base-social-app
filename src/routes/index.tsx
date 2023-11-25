import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import { namedLazy } from '../utils/namedLazy';

const PostFeed = namedLazy(
	() => import('../components/Content/PostFeed'),
	'PostFeed'
);

const UserProfile = namedLazy(
	() => import('../components/Content/UserProfile'),
	'UserProfile'
);

export const routes: RouteObject[] = [
	{
		path: '/post-feed',
		element: <PostFeed />
	},
	{
		path: '/user/:id',
		element: <UserProfile />
	},
	{
		path: '*',
		element: <Navigate to="/post-feed" />
	}
];
