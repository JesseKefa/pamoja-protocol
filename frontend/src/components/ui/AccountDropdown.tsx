"use client";

import { useEffect, useRef } from "react";
import { useDisconnect } from "wagmi";

interface Props {
  address: `0x${string}` | undefined;
  open: boolean;
  onClose: () => void;
}

export default function AccountDropdown({
  address,
  open,
  onClose,
}: Props) {
  const { disconnect } = useDisconnect();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="
        absolute
        right-0
        mt-4
        w-72
        overflow-hidden
        rounded-[28px]
        border
        border-[#ECE8E1]
        bg-white
        shadow-[0_20px_45px_rgba(16,24,40,.08)]
        animate-in
        fade-in
        zoom-in-95
        duration-200
      "
    >
      {/* Header */}

      <div className="border-b border-[#ECE8E1] px-6 py-5">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Pamoja Member
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Connected to Pamoja
        </p>

        <p className="mt-2 break-all font-semibold text-[#1F4D36]">
          {address}
        </p>

      </div>

      {/* Menu */}

      <div className="py-2">

        <button
          className="
            flex
            w-full
            items-center
            justify-between
            px-6
            py-4
            text-left
            transition
            hover:bg-[#F8F5F0]
          "
        >
          Dashboard

          <span>→</span>
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(address ?? "");
            onClose();
          }}
          className="
            flex
            w-full
            items-center
            justify-between
            px-6
            py-4
            text-left
            transition
            hover:bg-[#F8F5F0]
          "
        >
          Copy Address

          <span>→</span>
        </button>

      </div>

      {/* Footer */}

      <div className="border-t border-[#ECE8E1]">

        <button
          onClick={() => {
            disconnect();
            onClose();
          }}
          className="
            w-full
            px-6
            py-4
            text-left
            font-semibold
            text-[#8B5E3C]
            transition
            hover:bg-[#F8F5F0]
          "
        >
          Disconnect Wallet
        </button>

      </div>

    </div>
  );
}