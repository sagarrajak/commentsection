import { StorageEnum } from "../../indexDb/initDb";
import { updateData } from "../../indexDb/updateData";
import { useDbContext } from "../../provider/IndexDbProvider";
import { editCommentAction } from "../../slice/comment.slice";
import { useAppDispatch } from "../../store/store";


export function useEditCommentController() {
  const db = useDbContext();
  const dispatch = useAppDispatch();
  const editComment = async (data: {
    comment: string;
    userName: string;
    id: string
  }) => {
    const {comment, id, userName} = data;
    await updateData(StorageEnum.comments, id, comment, userName);
    dispatch(editCommentAction({id, comment, dateString: new Date().toISOString(), userName}))
  };

  return { editComment };
}

