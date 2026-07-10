"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);

  const { address, isConnected } = useAccount();

  const { connect, connectors } = useConnect();

  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="rounded-xl border px-5 py-2">
        Loading...
      </button>
    );
  }

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white"
      >
        {address?.slice(0, 6)}...
        {address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="rounded-xl bg-slate-900 px-5 py-2 font-medium text-white"
    >
      Connect Wallet
    </button>
  );
}