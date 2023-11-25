import classes from './Input.module.scss';
import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';

type Props = Readonly<InputHTMLAttributes<HTMLInputElement>> &
	Readonly<{
		labelText?: string;
		type?: 'text' | 'date' | 'password' | 'number';
	}>;

export const Input = (props: Props) => {
	const id = useId();
	return (
		<div className={classes.inputWrapper}>
			{props.labelText && (
				<label htmlFor={id} className={classes.label}>
					{props.labelText}
				</label>
			)}
			<input id={id} className={classes.input} {...props} />
		</div>
	);
};
