import type { MouseEvent } from 'react';
import classes from './Button.module.scss';

type Props = Readonly<{
	label: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}>;

export const Button = (props: Props) => (
	<button className={classes.button} onClick={props.onClick}>
		{props.label}
	</button>
);
