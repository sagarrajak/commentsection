import useAddCommentController from "../hooks/controller/useAddCommentController";
import useSortingCommentController from "../hooks/controller/useSortingCommentController";
import { useAppSelector } from "../store/store";
import AddCommentContainer from "./AddCommentContainer";
import { ReplyCommentSection } from "./ReplyCommentContainer";

function MainContainer() {
  const state = useAppSelector((state) => state.comments);
  const { addComment } = useAddCommentController();
  const { order, sortComments } = useSortingCommentController()

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
      <div onClick={sortComments} className="w-[80%] text-right hover:cursor-pointer">
        sort by date{" "}
        {order === -1 ? (
          <i className="fa-solid fa-arrow-up"></i>
        ) : (
          <i className="fa-solid fa-arrow-down"></i>
        )}
      </div>
      {state.comments.map((data) => (
        <ReplyCommentSection comment={data} />
      ))}
    </div>
  );
}

export default MainContainer;
