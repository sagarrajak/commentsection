import { useState } from 'react';
import { findAllData } from '../../indexDb/findAllData';
import { StorageEnum } from "../../indexDb/initDb";
import { useAppDispatch } from '../../store/store';
import { sortCommentTree } from '../../slice/comment.slice';
import { SingleCommentInterface } from '../../types';

function useSortingCommentController() {
    const [order, setSortingOrder] = useState<-1 | 1>(1);
    const dispatch = useAppDispatch();

    const sortComments = async () => {
        const data = await findAllData(StorageEnum.comments);
        if (order <= 0) {
            setSortingOrder(1);
            dispatch(sortCommentTree({ comments: data as SingleCommentInterface[], sortDirection: 1 }))
        } else {
            setSortingOrder(-1);
            dispatch(sortCommentTree({ comments: data as SingleCommentInterface[], sortDirection: -1 }))
        }
    };

    return { sortComments, order};
}

export default useSortingCommentController;
