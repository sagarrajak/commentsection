import React from "react";
import { twMerge } from "tailwind-merge";

export type TextFieldProps = React.HTMLProps<HTMLTextAreaElement>;

function TextField(props: TextFieldProps) {
  const className = twMerge(
    "block p-2.5 bg-white font-medium text-sm w-full border-gray-200 focus:border-blue-500",
    props.className || ""
  );
  return <textarea {...props} className={className} />;
}

export default TextField;
