import { StorageEnum } from "../../indexDb/initDb";
import { updateData } from "../../indexDb/updateData";
import { useDbContext } from "../../provider/IndexDbProvider";
import { editCommentAction } from "../../slice/comment.slice";
import { useAppDispatch } from "../../store/store";


export function useEditCommentController() {
  const db = useDbContext();
  const editComment = async (data: {
    comment: string;
    id: string
  }) => {
    const dispatch = useAppDispatch();
    const {comment, id} = data;
    await updateData(db, StorageEnum.comments, id, comment);
    dispatch(editCommentAction({id, comment, dateString: new Date().toISOString()}))
  };

  return { editComment };
}

