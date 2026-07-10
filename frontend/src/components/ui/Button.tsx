import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",

    secondary:
      "bg-white border border-slate-300 text-slate-900 hover:bg-slate-100",

    ghost:
      "text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      {...props}
      className={`
        h-12
        rounded-xl
        px-6
        font-semibold
        transition-all
        duration-200
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}