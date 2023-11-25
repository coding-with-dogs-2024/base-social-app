import type { ReactNode } from 'react';
import classes from './Card.module.scss';

type Props = Readonly<{
	title: ReactNode;
	body: ReactNode;
}>;

export const Card = (props: Props) => {
	return (
		<div className={classes.card}>
			{props.title}
			<span className={classes.divider} />
			{props.body}
		</div>
	);
};
