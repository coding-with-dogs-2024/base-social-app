import classes from './Input.module.scss';
import { useId } from 'react';

type Props = Readonly<{
	labelText?: string;
	name?: string;
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
