import type { MouseEvent } from 'react';
import classes from './Button.module.scss';
import classnames from 'classnames/bind';

type ButtonColor = 'primary' | 'secondary' | 'default';
type ButtonSize = 'small' | 'large' | 'default';

type Props = Readonly<{
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	color?: ButtonColor;
	size?: ButtonSize;
	children: string;
}>;

const boundClassNames = classnames.bind(classes);

export const Button = ({
	color = 'default',
	size = 'default',
	...props
}: Props) => {
	const buttonClassNames = boundClassNames({
		button: true,
		[`color-${color}`]: true,
		[`size-${size}`]: true
	});
	return (
		<button className={buttonClassNames} onClick={props.onClick}>
			{props.children}
		</button>
	);
};
