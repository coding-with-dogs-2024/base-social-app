import type { ComponentType, LazyExoticComponent } from 'react';
import { Suspense } from 'react';
import { CircleSpinner } from '../Spinner/Circle';
import classes from './Fallback.module.scss';

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly component: LazyExoticComponent<ComponentType<any>>;
}

const Fallback = () => (
	<div className={classes.fallback}>
		<CircleSpinner />
	</div>
);

export const LazySuspenseWrapper = (props: Props) => {
	const Component = props.component;
	return (
		<Suspense fallback={<Fallback />}>
			<Component />
		</Suspense>
	);
};
