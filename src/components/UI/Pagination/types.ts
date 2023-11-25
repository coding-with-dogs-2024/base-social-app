export type PaginationComponentProps = Readonly<{
	showPreviousPage: boolean;
	showNextPage: boolean;
	previousPage: () => void;
	nextPage: () => void;
}>;

export type UsePaginationReturn<T> = Readonly<{
	updatePagination: (posts: ReadonlyArray<T>) => void;
	extractPage: (posts: ReadonlyArray<T>) => ReadonlyArray<T>;
	componentProps: PaginationComponentProps;
}>;
