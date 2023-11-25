import classes from './Ellipsis.module.scss';

export const EllipsisSpinner = () => (
	<div role="progressbar" className={classes.ldsEllipsis}>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
);
