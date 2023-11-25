import classes from './Radio.module.scss';
import type { ChangeEvent } from 'react';
import { useId } from 'react';
import type { FormOption } from '../types';

type RadioProps<Value extends string> = Readonly<{
	labelText?: string;
	name: string;
	options: ReadonlyArray<FormOption<Value>>;
	selected: Value;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>;

type RadioOptionProps<Value extends string> = Readonly<{
	option: FormOption<Value>;
	name: string;
	selected: Value;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>;

const RadioOption = <Value extends string>(props: RadioOptionProps<Value>) => {
	const id = useId();
	const selected = props.selected === props.option.value;
	return (
		<div>
			<label htmlFor={id}>{props.option.label}</label>
			<input
				id={id}
				type="radio"
				name={props.name}
				value={props.option.value}
				checked={selected}
				onChange={props.onChange}
			/>
		</div>
	);
};

export const Radio = <Value extends string>(props: RadioProps<Value>) => {
	return (
		<div className={classes.radioWrapper}>
			{props.labelText && (
				<strong className={classes.label}>{props.labelText}</strong>
			)}
			<div className={classes.options}>
				{props.options.map((option) => (
					<RadioOption
						key={option.value}
						option={option}
						name={props.name}
						selected={props.selected}
						onChange={props.onChange}
					/>
				))}
			</div>
		</div>
	);
};
