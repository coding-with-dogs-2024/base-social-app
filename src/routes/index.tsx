import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import { namedLazy } from '../utils/namedLazy';
import { LazySuspenseWrapper } from '../components/UI/LazySuspenseWrapper';

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
		element: <LazySuspenseWrapper component={PostFeed} />
	},
	{
		path: '/user/:id',
		element: <LazySuspenseWrapper component={UserProfile} />
	},
	{
		path: '*',
		element: <Navigate to="/post-feed" />
	}
];
