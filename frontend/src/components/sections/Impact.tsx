"use client";

import { usePools } from "@/hooks/usePools";
import Container from "../ui/Container";
import { formatEther } from "viem";

export default function Impact() {
  const { pools } = usePools();

  const communityCount = pools?.length ?? 0;

  const treasury =
    pools?.reduce((total: bigint, pool: any) => {
      return total + BigInt(pool.contributionAmount);
    }, BigInt(0)) ?? BigInt(0);

  const stats = [
    {
      value: communityCount,
      label: "Communities",
    },
    {
      value: formatEther(treasury),
      label: "ETH Monthly",
    },
    {
      value: "100%",
      label: "Transparent",
    },
    {
      value: "24/7",
      label: "On-chain",
    },
  ];

  return (
    <section className="bg-slate-900 py-28 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          <p className="font-semibold uppercase tracking-[0.2em] text-[#C79A3B]">
            IMPACT
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Building trust,
            one community at a time.
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Every community created strengthens the ecosystem.
            Every contribution is visible.
            Every member shares ownership.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-slate-700 bg-slate-800 p-10 text-center"
            >
              <h3 className="text-5xl font-black text-[#C79A3B]">
                {stat.value}
              </h3>

              <p className="mt-4 text-lg text-slate-300">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </Container>
    </section>
  );
}