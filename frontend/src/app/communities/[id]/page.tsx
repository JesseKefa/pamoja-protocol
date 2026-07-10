"use client";

import { useParams } from "next/navigation";
import { formatEther } from "viem";

import Navbar from "@/components/Navbar";
import { usePool } from "@/hooks/usePool";

export default function CommunityDetailPage() {
  const params = useParams();

  const id = Number(params.id);

  const { pool, isLoading, error } = usePool(id);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-20">
          Loading community...
        </main>
      </>
    );
  }

  if (error || !pool) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-20">
          Community not found.
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-14">

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Active Community
          </span>

          <h1 className="mt-6 text-5xl font-black">
            {pool.name}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {pool.description}
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-4">

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <p className="text-sm text-slate-500">
              Monthly Contribution
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {formatEther(pool.contributionAmount)} ETH
            </h2>

          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <p className="text-sm text-slate-500">
              Creator
            </p>

            <h2 className="mt-2 font-semibold">
              {pool.creator.slice(0, 6)}...
              {pool.creator.slice(-4)}
            </h2>

          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <p className="text-sm text-slate-500">
              Created
            </p>

            <h2 className="mt-2 font-semibold">
              {new Date(
                Number(pool.createdAt) * 1000
              ).toLocaleDateString()}
            </h2>

          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <p className="text-sm text-slate-500">
              Status
            </p>

            <h2 className="mt-2 font-semibold text-emerald-600">
              Active
            </h2>

          </div>

        </div>

      </main>

    <section className="mt-16">

        <div className="flex flex-wrap gap-4">

            <button
            className="
                rounded-xl
                bg-[#1F4D36]
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:scale-105
            "
            >
            Join Community
            </button>

            <button
            className="
                rounded-xl
                border
                border-slate-300
                bg-white
                px-8
                py-4
                font-semibold
                transition
                hover:bg-slate-100
            "
            >
            Contribute
            </button>

        </div>

    </section>

    <section className="mt-20">

        <h2 className="text-3xl font-bold">
            About this Community
        </h2>

        <div className="mt-8 rounded-3xl border bg-white p-8">

            <p className="leading-8 text-slate-600">
            {pool.description}
            </p>

        </div>

    </section>

    <section className="mt-20 mb-24">

        <h2 className="text-3xl font-bold">
            Recent Activity
        </h2>

        <div className="mt-8 rounded-3xl border bg-white p-8">

            <p className="text-slate-500">
            No activity yet.
            </p>

        </div>

    </section>

    </>
  );
}