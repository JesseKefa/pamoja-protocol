"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
} from "wagmi";

import AccountDropdown from "./ui/AccountDropdown";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const { address, isConnected } = useAccount();

  const { connect, connectors } = useConnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="rounded-2xl border border-[#ECE8E1] bg-white px-6 py-3">
        Loading...
      </button>
    );
  }

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="
          rounded-2xl
          bg-[#1F4D36]
          px-6
          py-3
          font-semibold
          text-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#285F43]
          hover:shadow-lg
        "
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-[#ECE8E1]
          bg-white
          px-5
          py-3
          font-semibold
          text-[#1F4D36]
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-md
        "
      >
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

        {address?.slice(0, 6)}...
        {address?.slice(-4)}

        <span
          className={`transition duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <AccountDropdown
        address={address}
        open={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}