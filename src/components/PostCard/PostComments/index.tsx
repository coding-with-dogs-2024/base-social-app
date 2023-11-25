import classes from './PostComments.module.scss';
import { useGetAllCommentsForPost as useGetAllCommentsForPostDefault } from '../../../services/jsonapi/api';
import { EllipsisSpinner } from '../../UI/Spinner/Ellipsis';
import type { Comment as CommentType } from '../../../services/jsonapi/types';

type PostCommentsProps = Readonly<{
	postId: number;
}>;

type CommentProps = Readonly<{
	comment: CommentType;
}>;

const Comment = (props: CommentProps) => (
	<div data-testid="comment" className={classes.comment}>
		<div>
			<strong>{props.comment.email}</strong>
		</div>
		<div>{props.comment.body}</div>
	</div>
);

export const PostComments = (props: PostCommentsProps) => {
	const { isLoading, data } = useGetAllCommentsForPostDefault(props.postId);
	return (
		<div className={classes.postComments}>
			{isLoading && <EllipsisSpinner />}
			{!isLoading &&
				data &&
				data.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
		</div>
	);
};

type PostCommentsWithInjectionProps = PostCommentsProps &
	Readonly<{
		useGetAllCommentsForPost?: typeof useGetAllCommentsForPostDefault;
	}>;

export const PostCommentsWithInjection = ({
	useGetAllCommentsForPost = useGetAllCommentsForPostDefault,
	...props
}: PostCommentsWithInjectionProps) => {
	const { isLoading, data } = useGetAllCommentsForPost(props.postId);
	return (
		<div className={classes.postComments}>
			{isLoading && <EllipsisSpinner />}
			{!isLoading &&
				data &&
				data.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
		</div>
	);
};
