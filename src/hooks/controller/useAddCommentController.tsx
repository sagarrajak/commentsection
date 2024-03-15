import React from "react";
import { addData } from "../../indexDb/addData";
import { useDbContext } from "../../provider/IndexDbProvider";
import { StorageEnum } from "../../indexDb/initDb";
import { v4 as uuid } from 'uuid';
import { SingleCommentInterface } from "../../types";
import { useAppDispatch } from "../../store/store";
import { addCommentAction } from "../../slice/comment.slice";

function useAddCommentController() {
  const db = useDbContext()
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
    await addData(db, StorageEnum.comments, payload);
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
