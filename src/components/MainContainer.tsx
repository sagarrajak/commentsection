import useAddCommentController from "../hooks/controller/useAddCommentController";
import { useAppSelector } from "../store/store";
import AddCommentContainer from "./AddCommentContainer";
import { ReplyCommentSection } from "./ReplyCommentContainer";

function MainContainer() {
  const state = useAppSelector((state) => state.comments);
  const { addComment } = useAddCommentController();

  return (
    <div>
      <AddCommentContainer
        onSubmit={(data: {
          comment: string;
          createdDate: string;
          userName: string;
        }) => {
          addComment({
            comment: data.comment,
            userName: data.userName,
            parentId: null,
          });
        }}
      />
      {state.comments.map((data) => (
        <ReplyCommentSection comment={data} />
      ))}
    </div>
  );
}

export default MainContainer;
