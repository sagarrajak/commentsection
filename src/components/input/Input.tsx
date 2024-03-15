import { twMerge } from "tailwind-merge";

export type InputProps = React.HTMLProps<HTMLInputElement>;

function Input(props: InputProps) {
  const className = twMerge(
    "bg-white text-green-50 font-medium text-black text-sm w-full p-2.5 focus:border-blue-500",
    props.className || ""
  );

  return (
    <div>
      <input {...props} className={className} />
    </div>
  );
}

export default Input;
