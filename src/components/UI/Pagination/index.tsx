import classes from './Pagination.module.scss';
import type { PaginationComponentProps } from './types';

export const Pagination = (props: PaginationComponentProps) => (
	<div className={classes.pagination}>
		<button>Previous</button>
		<button>Next</button>
	</div>
);
