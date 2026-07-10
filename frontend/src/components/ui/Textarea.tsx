import { TextareaHTMLAttributes } from "react";

export default function Textarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        outline-none
        transition
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
        ${className}
      `}
    />
  );
}