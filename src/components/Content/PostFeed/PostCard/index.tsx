import type { Post } from '../../../../services/jsonapi/types';
import { Card } from '../../../UI/Card';
import classes from './PostCard.module.scss';
import { useGetUserById } from '../../../../services/jsonapi/api';
import { EllipsisSpinner } from '../../../UI/Spinner/Ellipsis';

type Props = Readonly<{
	post: Post;
}>;

const PostTitle = (props: Props) => {
	const { isLoading, data } = useGetUserById(props.post.userId);
	return (
		<div className={classes.postTitle}>
			<div>
				{props.post.id} - {props.post.title}
			</div>
			<div>
				{isLoading && <EllipsisSpinner />}
				{data && data.name}
			</div>
		</div>
	);
};

export const PostCard = (props: Props) => (
	<Card
		title={<PostTitle post={props.post} />}
		body={<div>{props.post.body}</div>}
	/>
);
