import { render, screen } from '@testing-library/react';
import { Button } from '../../../../src/components/UI/Button';
import type { MockedFunction } from 'vitest';
import type { MouseEvent } from 'react';
import { userEvent } from '@testing-library/user-event';

describe('Button', () => {
	it('renders with text', () => {
		render(<Button>My Button</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('My Button');
	});

	it('handles onClick', async () => {
		const onClick: MockedFunction<
			(e: MouseEvent<HTMLButtonElement>) => void
		> = vi.fn();
		render(<Button onClick={onClick}>My Button</Button>);

		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('sets different color & size classes', () => {
		render(
			<div>
				<Button>Default Button</Button>
				<Button color="primary" size="small">
					Small Primary Button
				</Button>
				<Button color="secondary" size="large">
					Large Secondary Button
				</Button>
			</div>
		);
		const defaultButton = screen.getByRole('button', {
			name: 'Default Button'
		});
		expect(defaultButton).toHaveClass('_button_d2dd1d');
	});
});
