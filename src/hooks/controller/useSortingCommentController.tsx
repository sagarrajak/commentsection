import { findAllData } from '../../indexDb/findAllData';
import { StorageEnum } from "../../indexDb/initDb";
import { sortCommentTree } from '../../slice/comment.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { SingleCommentInterface } from '../../types';

function useSortingCommentController() {
    const order = useAppSelector(state => state.comments.order);
    const dispatch = useAppDispatch();

    const sortComments = async () => {
        const data = await findAllData(StorageEnum.comments);
        if (order <= 0) {
            dispatch(sortCommentTree({ comments: data as SingleCommentInterface[], sortDirection: 1 }))
        } else {
            dispatch(sortCommentTree({ comments: data as SingleCommentInterface[], sortDirection: -1 }))
        }
    };

    return { sortComments, order};
}

export default useSortingCommentController;
