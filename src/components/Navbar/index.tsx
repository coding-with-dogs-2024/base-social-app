import classes from './Navbar.module.scss';
import { Link } from 'react-router-dom';

export const Navbar = () => (
	<header className={classes.navbar}>
		<h1 className={classes.title}>
			<Link to="/">My Social App</Link>
		</h1>
	</header>
);
