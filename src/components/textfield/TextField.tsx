import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TextFieldProps = React.HTMLProps<HTMLTextAreaElement>;

const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  (props, ref) => {
    const className = twMerge(
      "block p-2.5 bg-white font-medium text-sm w-full border-gray-200 focus:border-blue-500",
      props.className || ""
    );
    return <textarea {...props} ref={ref} className={className} />;
  }
);

export default TextField;
