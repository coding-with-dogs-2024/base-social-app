import { useRoutes } from 'react-router';
import { routes } from '../../routes';

export const Content = () => {
	const Routes = useRoutes(routes);
	return <main>{Routes}</main>;
};
