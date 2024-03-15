import { Button } from "./button/Button";
import Card from "./card/Card";
import Input from "./input/Input";
import TextField from "./textfield/TextField";


function AddEditCommentContainer() {
  return (
    <Card className="w-[50%] p-4 relative flex flex-col">
      <label className="block w-full text-left font-medium text-lg">
        Comment
      </label>
      <Input placeholder="Name" className="mt-2 mb-2" />
      <TextField rowSpan={5} className="mt-2 mb-2" placeholder="Comment" />
      <div className="flex flex-row justify-end">
        <Button className="flex-none w-auto">Submit</Button>
      </div>
    </Card>
  );
}

export default AddEditCommentContainer;
