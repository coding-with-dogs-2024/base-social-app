import type { Post } from '../../../../services/jsonapi/types';
import { Card } from '../../../UI/Card';
import classes from './PostCard.module.scss';

type Props = Readonly<{
	post: Post;
}>;

export const PostCard = (props: Props) => {
	return (
		<Card
			title={<div className={classes.title}>{props.post.title}</div>}
			body={<div>{props.post.body}</div>}
		/>
	);
};
