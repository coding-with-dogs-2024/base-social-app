import classes from './Select.module.scss';
import type { ChangeEvent } from 'react';
import { useId } from 'react';
import type { FormOption } from '../types';

type Props<Value extends string> = Readonly<{
	options: ReadonlyArray<FormOption<Value>>;
	name: string;
	labelText?: string;
	selected: Value;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}>;

export const Select = <Value extends string>(props: Props<Value>) => {
	const id = useId();
	return (
		<div className={classes.select}>
			{props.labelText && (
				<label className={classes.label} htmlFor={id}>
					{props.labelText}
				</label>
			)}
			<select
				className={classes.select}
				id={id}
				name={props.name}
				onChange={props.onChange}
			>
				{props.options.map((theOption) => (
					<option key={theOption.value} value={theOption.value}>
						{theOption.label}
					</option>
				))}
			</select>
		</div>
	);
};
