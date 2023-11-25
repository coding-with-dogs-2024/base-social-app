import type { ComponentType, LazyExoticComponent } from 'react';
import { Suspense } from 'react';
import { CircleSpinner } from '../Spinner/Circle';

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly component: LazyExoticComponent<ComponentType<any>>;
}

export const LazySuspenseWrapper = (props: Props) => {
	const Component = props.component;
	return (
		<Suspense fallback={<CircleSpinner />}>
			<Component />
		</Suspense>
	);
};
