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
      label: "Treasury Volume",
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
    <section
      className="
        relative
        overflow-hidden
        bg-[#061F17]
        py-28
        text-white
      "
    >
      {/* Continuous gold atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-[-280px]
          h-[700px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-[#C79A3B]/10
          blur-[150px]
        "
      />

      {/* Subtle green atmosphere */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[45%]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#1F4D36]/30
          blur-[140px]
        "
      />

      <Container>
        <div className="relative z-10">

          {/* Intro */}

          <div className="mx-auto max-w-3xl text-center">

            <p className="font-semibold uppercase tracking-[0.3em] text-[#C79A3B]">
              IMPACT
            </p>

            <h2
              className="
                mt-5
                text-5xl
                font-black
                tracking-tight
                text-white
                lg:text-6xl
              "
            >
              Building trust,
              <br />
              one community at a time.
            </h2>

            <p
              className="
                mx-auto
                mt-7
                max-w-2xl
                text-lg
                leading-8
                text-slate-300
              "
            >
              Every community created strengthens the ecosystem.
              Every contribution is visible.
              Every member shares ownership.
            </p>

          </div>


          {/* Stats */}

          <div
            className="
              mt-20
              grid
              gap-10
              md:grid-cols-2
              xl:grid-cols-4
            "
          >

            {stats.map((stat) => (

              <div
                key={stat.label}
                className="
                  border-t
                  border-white/20
                  px-4
                  pt-8
                  text-center
                "
              >

                <h3
                  className="
                    text-5xl
                    font-black
                    tracking-tight
                    text-[#C79A3B]
                    lg:text-6xl
                  "
                >
                  {stat.value}
                </h3>

                <p
                  className="
                    mt-4
                    text-base
                    font-medium
                    text-slate-300
                  "
                >
                  {stat.label}
                </p>

              </div>

            ))}

          </div>


          {/* Transition space */}

          <div className="h-64" />

        </div>
      </Container>

    </section>
  );
}