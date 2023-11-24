import classes from './Circle.module.scss';

/**
 * Got this design from https://loading.io/css/
 */
export const CircleSpinner = () => (
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
