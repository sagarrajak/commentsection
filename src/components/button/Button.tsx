import { twMerge } from "tailwind-merge";

export type ButtonProps = React.HTMLProps<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const { label, type, ...otherProps } = props;
  const className = twMerge(
    "text-white bg-blue-500 font-sm border rounded-lg text-sm hover:bg-blue-800 focus:ring-blue-300 p-2",
    props.className || ""
  );

  return (
    <button {...otherProps} className={className}>
      {label}
    </button>
  );
};
