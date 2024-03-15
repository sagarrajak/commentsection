import { useState } from "react";
import { CommentStruct } from "../types";
import EditCommentContainer from "./EditCommentContainer";
import AddCommentContainer from "./AddCommentContainer";
import CommentContainer from "./CommentContainer";
import useAddCommentController from "../hooks/controller/useAddCommentController";
import { useEditCommentController } from "../hooks/controller/useEditCommentController";
import useDeleteCommentController from "../hooks/controller/useDeleteCommentController";

export const ReplyCommentSection = (props: { comment: CommentStruct }) => {
  const { comment } = props;
  const [isEditMode, setisEditMode] = useState<boolean>(false);
  const [isReplyMode, setisReplyMode] = useState<boolean>(false);

  const { addComment } = useAddCommentController();
  const { editComment } = useEditCommentController();
  const { deleteComment } = useDeleteCommentController();

  return (
    <>
      <div>
        {!isEditMode && (
          <CommentContainer
            onEdit={() => {
              if (!isReplyMode) setisEditMode(true);
            }}
            onReply={() => {
              if (!isEditMode) setisReplyMode(true);
            }}
            onDelete={() => {
              deleteComment({ id: comment.id });
            }}
            comment={comment.comment}
            userName={comment.userName}
            createdDate={comment.createdDate}
          />
        )}
      </div>
      <>
        {isReplyMode && (
          <AddCommentContainer
            onSubmit={(data: {
              comment: string;
              createdDate: string;
              userName: string;
            }) => {
              addComment({
                comment: data.comment,
                userName: data.userName,
                parentId: comment.id,
              }).then((res) => {
                setisReplyMode(false);
              });
            }}
          />
        )}
      </>
      <>
        {isEditMode && (
          <EditCommentContainer
            onSubmit={(data: {
              comment: string;
              createdDate: string;
              userName: string;
            }) => {
              editComment({
                comment: data.comment,
                id: comment.id,
                userName: data.userName,
              }).then(() => {
                setisEditMode(false);
              });
            }}
            data={{
              comment: comment.comment,
              createdDate: comment.createdDate,
              userName: comment.userName,
            }}
          />
        )}
      </>
      <div className="block ml-12">
        {(comment.replys || []).map((data) => {
          return <>{<ReplyCommentSection comment={data} />}</>;
        })}
      </div>
    </>
  );
};
