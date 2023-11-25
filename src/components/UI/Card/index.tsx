import type { ReactNode } from 'react';
import classes from './Card.module.scss';
import classNames from 'classnames/bind';

type Props = Readonly<{
	title: ReactNode;
	body: ReactNode;
	className?: string;
}>;

const boundClassNames = classNames.bind(classes);

export const Card = (props: Props) => {
	const rootClasses = boundClassNames({
		card: true,
		[props.className ?? '']: true
	});
	return (
		<div className={rootClasses}>
			{props.title}
			<span className={classes.divider} />
			{props.body}
		</div>
	);
};
