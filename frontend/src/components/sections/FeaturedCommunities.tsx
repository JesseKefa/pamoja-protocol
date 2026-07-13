"use client";

import Link from "next/link";
import { ArrowRight, Users, Wallet } from "lucide-react";
import { formatEther } from "viem";

import Container from "../ui/Container";
import Card from "../ui/Card";

import { usePools } from "@/hooks/usePools";

export default function FeaturedCommunities() {
  const { pools, isLoading } = usePools();

  return (
    <section className="bg-[#F8F6F2] py-28">
      <Container>

        <div className="flex items-end justify-between">

          <div>

            <p className="font-semibold uppercase tracking-[0.2em] text-[#C79A3B]">
              COMMUNITIES
            </p>

            <h2 className="mt-3 text-5xl font-black text-slate-900">
              Featured Communities
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Explore transparent community savings groups already
              building wealth on Pamoja Protocol.
            </p>

          </div>

          <Link
            href="/communities"
            className="hidden font-semibold text-[#1F4D36] hover:underline lg:block"
          >
            View all →
          </Link>

        </div>

        {isLoading && (
          <p className="mt-16 text-slate-500">
            Loading communities...
          </p>
        )}

        {!isLoading &&
          Array.isArray(pools) &&
          pools.length === 0 && (

            <Card className="mt-14 text-center">

              <h3 className="text-3xl font-bold text-slate-900">
                No Communities Yet
              </h3>

              <p className="mt-4 text-slate-600">
                Be the first person to create a community on
                Pamoja Protocol.
              </p>

              <Link
                href="/create"
                className="mt-8 inline-flex rounded-xl bg-[#1F4D36] px-6 py-3 font-semibold text-white"
              >
                Create Community
              </Link>

            </Card>
          )}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {Array.isArray(pools) &&
            pools.slice(0, 6).map((pool: any) => (

              <Card
                key={pool.poolAddress}
                className="group transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                    Active
                  </span>

                  <ArrowRight
                    className="text-slate-400 transition group-hover:translate-x-1"
                    size={18}
                  />

                </div>

                <h3 className="mt-8 text-3xl font-bold text-slate-900">
                  {pool.name}
                </h3>

                <p className="mt-5 line-clamp-3 leading-7 text-slate-600">
                  {pool.description}
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">

                    <Wallet size={18} />

                    <span className="text-slate-700">
                      {formatEther(pool.contributionAmount)} ETH / month
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <Users size={18} />

                    <span className="text-slate-700">
                      Community Savings Group
                    </span>

                  </div>

                </div>

                <Link
                  href={`/communities/${Number(pool.id)}`}
                  className="mt-10 inline-flex font-semibold text-[#1F4D36]"
                >
                  View Community →
                </Link>

              </Card>

            ))}

        </div>

      </Container>
    </section>
  );
}