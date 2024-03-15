import { v4 as uuid } from 'uuid';
import { addData } from "../../indexDb/addData";
import { StorageEnum } from "../../indexDb/initDb";
import { addCommentAction } from "../../slice/comment.slice";
import { useAppDispatch } from "../../store/store";
import { SingleCommentInterface } from "../../types";

function useAddCommentController() {
  const dispatch = useAppDispatch();
  const addComment = async (data: {
    comment: string;
    userName: string;
    parentId: string | null;
  }) => {
    const {parentId} = data;
    const payload: SingleCommentInterface = {
        id: uuid(),
        createdDate: new Date().toISOString(),
        editedDate: new Date().toISOString(),
        ...data

    };
    await addData(StorageEnum.comments, payload);
    dispatch(
      addCommentAction({
        parentId: parentId,
        comment: payload,
      })
    );
  };


  return { addComment };
}

export default useAddCommentController;
