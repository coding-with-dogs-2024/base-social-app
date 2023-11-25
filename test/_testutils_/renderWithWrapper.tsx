import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../src/services/queryClient';

const QueryClientWrapper = (props: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		{props.children}
	</QueryClientProvider>
);

export const renderWithQueryClient = (
	elem: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) =>
	render(elem, {
		wrapper: QueryClientWrapper,
		...(options ?? {})
	});
