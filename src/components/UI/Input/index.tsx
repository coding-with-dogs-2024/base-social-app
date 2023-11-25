import classes from './Input.module.scss';
import type { InputHTMLAttributes } from 'react';

type Props = Readonly<InputHTMLAttributes<HTMLInputElement>> &
	Readonly<{
		labelText?: string;
	}>;

export const Input = (props: Props) => (
	<div className={classes.inputWrapper}>
		{props.labelText && (
			<label className={classes.label}>{props.labelText}</label>
		)}
		<input className={classes.input} {...props} />
	</div>
);
