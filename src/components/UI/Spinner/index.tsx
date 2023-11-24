import classes from './Spinner.module.scss';

/**
 * Got this design from https://loading.io/css/
 */
export const Spinner = () => (
	<div className={classes.ldsRoller}>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
);
