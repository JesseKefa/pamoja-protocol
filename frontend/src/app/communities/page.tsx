"use client";

import Navbar from "@/components/Navbar";
import { usePools } from "@/hooks/usePools";
import CommunityCard from "@/components/CommunityCard";

export default function CommunitiesPage() {
  const { pools, isLoading, error } = usePools();

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-900">
            Communities
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Discover savings communities built on Pamoja Protocol.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            Loading communities...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-10 text-center text-red-600">
            Failed to load communities.
          </div>
        )}

        {!isLoading &&
          Array.isArray(pools) &&
          pools.length === 0 && (
            <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
              <h2 className="text-2xl font-bold">
                No communities yet
              </h2>

              <p className="mt-3 text-slate-500">
                Create the first community and start building together.
              </p>
            </div>
          )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(pools) &&
            pools.map((pool) => (
              <CommunityCard
                key={pool.poolAddress}
                pool={pool}
              />
            ))}
        </div>

      </main>
    </>
  );
}