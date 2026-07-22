import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  href,
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-[#1F4D36] text-white hover:bg-[#285F43] shadow-sm",

    secondary:
      "border border-[#D8D3CB] bg-white text-[#1F2937] hover:bg-[#F8F5F0]",

    ghost:
      "text-[#1F2937] hover:bg-[#F8F5F0]",
  };

  const classes = `
    inline-flex
    h-12
    items-center
    justify-center
    rounded-2xl
    px-6
    font-semibold
    transition-all
    duration-300
    hover:-translate-y-0.5
    ${styles[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}