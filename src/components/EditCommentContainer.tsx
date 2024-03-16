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
  data: {
    comment: string;
    createdDate: string;
    userName: string;
  };
}

function EditCommentContainer(props: EditCommentContainerProps) {
  const { data, onSubmit } = props;

  const { register, handleSubmit, formState: {errors} } = useForm<{
    userName: string;
    comment: string;
  }>({
    defaultValues: {
      comment: data.comment,
      userName: data.userName
    }
  });

  const handleSubmitHelper = handleSubmit((data) => {
    onSubmit({ ...data, createdDate: new Date().toISOString() });
  });

  return (
    <Card className="w-[50%] p-4 relative flex flex-col">
      <label className="block w-full text-left font-medium text-lg">
        Edit comment
      </label>
      <Input
        placeholder="Name"
        className="mt-2 mb-2"
        disabled
        {...register("userName", {required: true})}
      />
       {errors.userName?.type === 'required' && (
          <p className="font-normal text-sm text-red-500 mt-[-10px] mb-2">Field is required!</p>
        )}
      <TextField
        rowSpan={5}
        className="mt-2 mb-2"
        placeholder="Comment"
        {...register("comment", {required: true})}
      />
       {errors.comment?.type === 'required' && (
          <p className="font-normal text-sm text-red-500 mt-[-10px] mb-2">Field is required!</p>
        )}
      <div className="flex flex-row justify-end">
        <Button className="flex-none w-auto" onClick={handleSubmitHelper}>
          Submit
        </Button>
      </div>
    </Card>
  );
}

export default EditCommentContainer;
