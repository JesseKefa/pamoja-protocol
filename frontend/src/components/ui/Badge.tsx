import { ReactNode } from "react";

export default function Badge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        bg-blue-100
        px-3
        py-1
        text-sm
        font-semibold
        text-blue-700
      "
    >
      {children}
    </span>
  );
}