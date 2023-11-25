import { render, screen } from '@testing-library/react';
import { Pagination } from '../../../../src/components/UI/Pagination';
import type { PaginationComponentProps } from '../../../../src/components/UI/Pagination/types';
import type { MockedFunction } from 'vitest';
import { userEvent } from '@testing-library/user-event';

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

const queryForPreviousButton = (): HTMLElement | null =>
	screen.queryByRole('button', {
		name: 'Previous'
	});

const queryForNextButton = (): HTMLElement | null =>
	screen.queryByRole('button', {
		name: 'Next'
	});

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

	it('renders with previous page button only', async () => {
		doRender({
			showPreviousPage: true,
			showNextPage: false
		});

		const button = queryForPreviousButton();
		expect(button).not.toBeNull();
		await userEvent.click(button!);

		expect(previousPage).toHaveBeenCalledOnce();
	});

	it('renders with next page button only', async () => {
		doRender({
			showPreviousPage: false,
			showNextPage: true
		});

		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Next');
		await userEvent.click(button);

		expect(nextPage).toHaveBeenCalledOnce();
	});

	it('renders with both buttons', async () => {
		doRender({
			showPreviousPage: true,
			showNextPage: true
		});

		const previousButton = screen.getByRole('button', {
			name: 'Previous'
		});
		await userEvent.click(previousButton);
		expect(previousButton).toHaveBeenCalledOnce();

		const nextButton = screen.getByRole('button', {
			name: 'Next'
		});
		await userEvent.click(nextButton);
		expect(nextButton).toHaveBeenCalledOnce();
	});
});