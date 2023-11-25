import { useGetAllCommentsForPost } from '../../../services/jsonapi/api';
import { EllipsisSpinner } from '../../UI/Spinner/Ellipsis';

type Props = Readonly<{
	postId: number;
}>;

export const PostComments = (props: Props) => {
	const { isLoading } = useGetAllCommentsForPost(props.postId);
	return (
		<div>
			{isLoading && <EllipsisSpinner />}
			{!isLoading && <div>All Comments</div>}
		</div>
	);
};
