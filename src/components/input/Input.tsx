import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = React.HTMLProps<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const className = twMerge(
    "bg-white text-green-50 font-medium text-black text-sm w-full p-2.5 focus:border-blue-500 disabled:bg-gray-400",
    props.className || ""
  );

  return <input {...props} ref={ref} className={className} />;
});

export default Input;
