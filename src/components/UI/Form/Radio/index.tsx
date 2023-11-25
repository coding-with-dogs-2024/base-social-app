import classes from './Radio.module.scss';
import type { ChangeEvent } from 'react';
import { useId } from 'react';

export type RadioOption<Value extends string> = Readonly<{
	value: Value;
	label: string;
}>;

type RadioProps<Value extends string> = Readonly<{
	labelText?: string;
	name: string;
	options: ReadonlyArray<RadioOption<Value>>;
	selected?: Value;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}>;

type RadioOptionProps<Value extends string> = Readonly<{
	option: RadioOption<Value>;
	name: string;
}>;

const RadioOption = <Value extends string>(props: RadioOptionProps<Value>) => {
	const id = useId();
	return (
		<div>
			<label htmlFor={id}>{props.option.label}</label>
			<input
				id={id}
				type="radio"
				name={props.name}
				value={props.option.value}
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
					/>
				))}
			</div>
		</div>
	);
};
