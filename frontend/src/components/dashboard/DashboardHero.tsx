"use client";

import { useAccount } from "wagmi";

export default function DashboardHero() {
  const { address } = useAccount();

  return (
    <section className="mb-16">

      <p className="text-sm font-semibold uppercase tracking-widest text-[#8B5E3C]">
        Dashboard
      </p>

      <h1 className="mt-3 text-5xl font-black">

        Welcome back,

        <span className="text-[#1F4D36]">

          {" "}
          {address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Friend"}

        </span>

      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">

        Manage your communities, monitor contributions,
        and keep track of your savings journey.

      </p>

    </section>
  );
}