import { render, screen } from '@testing-library/react';
import { Registration } from '../../../../src/components/Content/Registration';

describe('Registration', () => {
	it('can update all the controls', async () => {
		render(<Registration />);
		expect(
			screen.getByRole('heading', {
				level: 1
			})
		).toHaveTextContent('Registration');

		const sectionHeadings = screen.getAllByRole('heading', {
			level: 2
		});
		expect(sectionHeadings).toHaveLength(3);
		expect(sectionHeadings[0]).toHaveTextContent('Credentials');
		expect(sectionHeadings[1]).toHaveTextContent('Personal Information');
		expect(sectionHeadings[2]).toHaveTextContent('App Settings');
	});
});
