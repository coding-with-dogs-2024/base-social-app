import classes from './Pagination.module.scss';
import type { PaginationComponentProps } from './types';
import { Button } from '../Button';

export const Pagination = (props: PaginationComponentProps) => (
	<div data-testid="pagination" className={classes.pagination}>
		{props.showPreviousPage && (
			<Button onClick={props.previousPage}>Previous</Button>
		)}
		{props.showNextPage && <Button onClick={props.nextPage}>Next</Button>}
	</div>
);
