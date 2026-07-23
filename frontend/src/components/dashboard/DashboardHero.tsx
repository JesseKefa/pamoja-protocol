"use client";

import { useAccount } from "wagmi";

export default function DashboardHero() {
  const { address } = useAccount();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <section className="mb-14">

      <p className="text-sm uppercase tracking-[0.18em] text-[#8B5E3C]">
        Dashboard
      </p>

      <h1 className="mt-3 text-5xl font-black text-[#1F2937]">
        {greeting}
      </h1>

      <p className="mt-4 text-lg text-slate-600">
        Welcome back to Pamoja Protocol.
      </p>

      <div
        className="
          mt-8
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
        "
      >
        <p className="text-sm text-slate-500">
          Connected Wallet
        </p>

        <p className="mt-2 break-all text-lg font-semibold text-[#1F4D36]">
          {address}
        </p>
      </div>

    </section>
  );
}