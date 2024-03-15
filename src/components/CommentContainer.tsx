import Card from "./card/Card";

export interface CommentContainerProps {}


export interface CommentContainerProps {
    // onEdit: () => void;
    // onReply: () => void;
    // onDelete: () => void;
}

function CommentContainer() {
  return (
    <Card className="w-[50%] p-4 relative flex flex-col">
      <div className="block w-full text-left font-medium text-lg">Comment</div>
      <div className="text-sm font-medium absolute right-1 top-1">2nd Aug 2020</div>
      <div className="mt-2 mb-2  font-normal text-sm text-gray-500 w-[80%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
        consequuntur cupiditate repellendus similique eos at nulla, accusantium
        alias quisquam ipsam quo ratione facere quae corporis hic pariatur a
        optio provident.
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
        >
          Reply
        </div>
        <div
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
      <i className="fa fa-trash absolute right-[-5px] bottom-[50%] rounded-full bg-gray-50" aria-hidden="true"></i>
    </Card>
  );
}

export default CommentContainer;
