import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#E8E2D8]
        bg-white
        p-8
        shadow-[0_6px_24px_rgba(15,23,42,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#D6C8B2]
        hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]
        ${className}
      `}
    >
      {/* Accent line */}

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#1F4D36] via-[#C9A227] to-[#1F4D36] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {children}
    </div>
  );
}