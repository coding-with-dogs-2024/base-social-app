import { render, screen } from '@testing-library/react';
import { Pagination } from '../../../../src/components/UI/Pagination';
import type { PaginationComponentProps } from '../../../../src/components/UI/Pagination/types';
import type { MockedFunction } from 'vitest';

type DoRenderProps = Omit<
	PaginationComponentProps,
	'previousPage' | 'nextPage'
>;

const previousPage: MockedFunction<() => void> = vi.fn();
const nextPage: MockedFunction<() => void> = vi.fn();

const doRender = (props: DoRenderProps) =>
	render(
		<Pagination
			showPreviousPage={props.showPreviousPage}
			showNextPage={props.showNextPage}
			previousPage={previousPage}
			nextPage={nextPage}
		/>
	);

describe('Pagination', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders with neither button', () => {
		doRender({
			showPreviousPage: false,
			showNextPage: false
		});

		const buttons = screen.queryAllByRole('button');
		expect(buttons).toHaveLength(0);
	});
});
