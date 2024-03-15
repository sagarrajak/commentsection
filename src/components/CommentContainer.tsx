import Card from "./card/Card";

export interface CommentContainerProps {}

export interface CommentContainerProps {
  onEdit: () => void;
  onReply: () => void;
  onDelete: () => void;
  comment: string;
  userName: string;
  createdDate: string;
}

function CommentContainer(props: CommentContainerProps) {
  const { onDelete, onEdit, onReply, comment, createdDate, userName } = props;

  return (
    <Card className="w-[50%] p-4 relative flex flex-col">
      <div className="block w-full text-left font-medium text-lg">
        {userName}
      </div>
      <div className="text-sm font-medium absolute right-1 top-1">
        {createdDate}
      </div>
      <div className="mt-2 mb-2  font-normal text-sm text-gray-500 w-[80%]">
        {comment}
      </div>
      <div className="flex flex-row justify-start">
        <div
          className="
            font-medium
            text-sm
            inline-block
            text-blue-500
            hover:text-blue-700
            pl-2 pr-2
      "
          onClick={onReply}
        >
          Reply
        </div>
        <div
          onClick={onEdit}
          className="
            font-medium
            text-sm
            inline-block
            text-blue-500
            hover:text-blue-700
            pl-2
            pr-2
      "
        >
          Edit
        </div>
      </div>
      <i
        className="fa fa-trash absolute right-[-5px] bottom-[50%] rounded-full bg-gray-50 hover:cursor-pointer"
        onClick={onDelete}
        aria-hidden="true"
      ></i>
    </Card>
  );
}

export default CommentContainer;
