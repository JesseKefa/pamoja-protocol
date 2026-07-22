import { formatEther } from "viem";

type Props = {
  pool: any;
  treasury?: bigint;
  memberCount?: bigint;
};

export default function CommunityStats({
  pool,
  treasury = 0n,
  memberCount = 0n,
}: Props) {
  return (
    <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

      {/* Monthly Contribution */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <p className="text-sm text-slate-500">
          Monthly Contribution
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {formatEther(pool.contributionAmount)} ETH
        </h2>

      </div>

      {/* Creator */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <p className="text-sm text-slate-500">
          Creator
        </p>

        <h2 className="mt-2 font-semibold">
          {pool.creator.slice(0, 6)}...
          {pool.creator.slice(-4)}
        </h2>

      </div>

      {/* Created */}

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

      {/* Status */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <p className="text-sm text-slate-500">
          Status
        </p>

        <h2 className="mt-2 font-semibold text-emerald-600">
          Active
        </h2>

      </div>

      {/* Treasury */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <p className="text-sm text-slate-500">
          Treasury
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {formatEther(treasury)} ETH
        </h2>

      </div>

      {/* Members */}

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <p className="text-sm text-slate-500">
          Members
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {Number(memberCount)}
        </h2>

      </div>

    </section>
  );
}