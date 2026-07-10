import { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`
        h-12
        w-full
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
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