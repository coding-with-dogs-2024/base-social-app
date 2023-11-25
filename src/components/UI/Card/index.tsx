import type { ReactNode } from 'react';
import classes from './Card.module.scss';
import classNames from 'classnames/bind';

type Props = Readonly<{
	title: ReactNode;
	body: ReactNode;
	className?: string;
	'data-testid'?: string;
}>;

const boundClassNames = classNames.bind(classes);

export const Card = (props: Props) => {
	const rootClasses = boundClassNames({
		card: true,
		[props.className ?? '']: true
	});
	return (
		<div data-testid={props['data-testid']} className={rootClasses}>
			{props.title}
			<span className={classes.divider} />
			{props.body}
		</div>
	);
};
