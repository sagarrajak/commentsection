import { deleteData } from "../../indexDb/deleteData";
import { StorageEnum } from "../../indexDb/initDb";
import { useDbContext } from "../../provider/IndexDbProvider";
import { deleteCommentAction } from "../../slice/comment.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CommentStruct } from "../../types";

function findAllChildsOfDeletedNode(comment: CommentStruct): string[] {
  let ans = [comment.id];
  if (comment.replys) {
    for (let i = 0; i < comment.replys.length; i++) {
      ans = [...ans, ...findAllChildsOfDeletedNode(comment.replys[i])];
    }
  }
  return ans;
}

function findDeletedNode(
  id: string,
  comment: CommentStruct
): CommentStruct | undefined {
  
  if (!comment) return;
  if (comment.id === id) return comment;
  if (!comment.replys) return undefined;
  for (let i = 0; i < (comment.replys || []).length; i++) {
    const out = findDeletedNode(id, comment.replys[i]);
    if (out) return out;
  }
  return undefined;
}

function useDeleteCommentController() {
  const db = useDbContext();
  const state = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const deleteComment = async (data: { id: string }) => {
    const { id } = data;
    for (let i = 0; i < state.comments.length; i++) {
      const node = findDeletedNode(id, state.comments[i]);
      if (node) {
        const nodesToDelete = findAllChildsOfDeletedNode(node);
        await deleteData(db, StorageEnum.comments, nodesToDelete);
        break;
      }
    }
    
    // TODO dispatch event to delete add child nodes
    dispatch(deleteCommentAction({id: data.id}))
  };

  return { deleteComment };
}

export default useDeleteCommentController;
