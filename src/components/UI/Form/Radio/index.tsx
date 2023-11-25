import classes from './Radio.module.scss';
import { useId } from 'react';

export type RadioOption = Readonly<{
	value: string;
	label: string;
}>;

type RadioProps = Readonly<{
	labelText?: string;
	name: string;
	options: ReadonlyArray<RadioOption>;
}>;

type RadioOptionProps = Readonly<{
	option: RadioOption;
	name: string;
}>;

const RadioOption = (props: RadioOptionProps) => {
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

export const Radio = (props: RadioProps) => {
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
