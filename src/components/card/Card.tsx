import React from "react";
import { twMerge } from "tailwind-merge";

export type CardProps = React.HTMLProps<HTMLDivElement>;

function Card(props: CardProps) {
  const className = twMerge(
    "w-full bg-gray-300 border border-gray-200 rounded-md shadow m-2.5 p-2.5",
    props.className || ""
  );
  const { children } = props;
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

export default Card;
