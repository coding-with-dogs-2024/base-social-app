import classes from './Content.module.scss';
import { useRoutes } from 'react-router';
import { routes } from '../../routes';

export const Content = () => {
	const Routes = useRoutes(routes);
	return <main className={classes.content}>{Routes}</main>;
};
