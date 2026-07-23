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
        bg-[#081C15]
        py-36
        text-white
      "
    >

      {/* subtle glow */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-[400px]
          w-[400px]
          -translate-x-1/2
          rounded-full
          bg-[#C79A3B]/10
          blur-3xl
        "
      />


      <Container>


        <div
          className="
            relative
            mx-auto
            max-w-4xl
            text-center
          "
        >

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#C79A3B]
            "
          >
            Impact
          </p>


          <h2
            className="
              mt-6
              text-5xl
              font-black
              leading-tight
              lg:text-6xl
            "
          >
            A growing network
            <br />
            of community-owned finance.
          </h2>


          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-xl
              leading-9
              text-white/70
            "
          >
            Every community strengthens the ecosystem.
            Every contribution creates transparency.
            Every member participates in shared ownership.
          </p>


        </div>




        <div
          className="
            relative
            mt-24
            grid
            gap-8
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
                pt-8
                text-center
              "
            >

              <h3
                className="
                  text-6xl
                  font-black
                  tracking-tight
                  text-[#C79A3B]
                "
              >
                {stat.value}
              </h3>


              <p
                className="
                  mt-4
                  text-lg
                  text-white/70
                "
              >
                {stat.label}
              </p>


            </div>

          ))}

        </div>


      </Container>


    </section>

  );
}