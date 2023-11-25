import type { Post } from '../../../../services/jsonapi/types';
import { Card } from '../../../UI/Card';
import classes from './PostCard.module.scss';
import {useGetUserById} from '../../../../services/jsonapi/api';

type Props = Readonly<{
	post: Post;
}>;

const PostTitle = (props: Props) => {
	const { isLoading, data } = useGetUserById(props.post.userId);
	return (
		<div className={classes.title}>
			{props.post.id} - {props.post.title}
		</div>
	);
};

export const PostCard = (props: Props) => {
	return (
		<Card
			title={
				<div className={classes.title}>
					{props.post.id} - {props.post.title}
				</div>
			}
			body={<div>{props.post.body}</div>}
		/>
	);
};
