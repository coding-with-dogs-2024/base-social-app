import type { Post } from '../../../../services/jsonapi/types';
import { Card } from '../../../UI/Card';

type Props = Readonly<{
	post: Post;
}>;

export const PostCard = (props: Props) => {
	return (
		<Card
			title={<div>{props.post.title}</div>}
			body={<div>{props.post.body}</div>}
		/>
	);
};
