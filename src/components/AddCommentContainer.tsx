import { useForm } from "react-hook-form";
import { Button } from "./button/Button";
import Card from "./card/Card";
import Input from "./input/Input";
import TextField from "./textfield/TextField";

export interface EditCommentContainerProps {
  onSubmit: (data: {
    comment: string;
    createdDate: string;
    userName: string;
  }) => void;
}

function AddCommentContainer(props: EditCommentContainerProps) {
  const {  register, handleSubmit } = useForm<{
    userName: string;
    comment: string;
  }>();

  const { onSubmit } = props;
  const handleSubmitHelper = handleSubmit((data) => {
    onSubmit({ ...data, createdDate: new Date().toISOString() });
  });


  return (
    <form onSubmit={handleSubmitHelper}>
      <Card className="w-[50%] p-4 relative flex flex-col">
        <label className="block w-full text-left font-medium text-lg">
          Add comment
        </label>
        <Input
          placeholder="Name"
          className="mt-2 mb-2"
          {...register("userName")}
        />
        <TextField
          rowSpan={5}
          className="mt-2 mb-2"
          placeholder="Comment"
          {...register("comment")}
        />
        <div className="flex flex-row justify-end">
          <Button className="flex-none w-auto" type="submit">
            Submit
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default AddCommentContainer;
