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
});
