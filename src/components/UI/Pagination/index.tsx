import classes from './Pagination.module.scss';
import type { PaginationComponentProps } from './types';
import { Button } from '../Button';

export const Pagination = (props: PaginationComponentProps) => (
	<div className={classes.pagination}>
		<Button onClick={props.previousPage}>Previous</Button>
		<Button onClick={props.nextPage}>Next</Button>
	</div>
);
