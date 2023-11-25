import classes from './Checkbox.module.scss';
import { useId } from 'react';

type Props = Readonly<{
	labelText?: string;
	name?: string;
}>;

export const Checkbox = (props: Props) => {
	const id = useId();
	return (
		<div className={classes.checkboxWrapper}>
			<div className={classes.innerWrapper}>
				{props.labelText && (
					<label className={classes.label} htmlFor={id}>
						{props.labelText}
					</label>
				)}
				<input
					className={classes.checkbox}
					type="checkbox"
					name={props.name}
					id={id}
				/>
			</div>
		</div>
	);
};
