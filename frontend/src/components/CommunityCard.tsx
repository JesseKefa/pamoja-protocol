import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Card from "./ui/Card";

type Pool = {
  id: bigint;
  name: string;
  description: string;
  creator: `0x${string}`;
  poolAddress: `0x${string}`;
  createdAt: bigint;
  isActive: boolean;
  contributionAmount: bigint;
};

type Props = {
  pool: Pool;
};

export default function CommunityCard({ pool }: Props) {
  return (
    <Card>
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937]">
            {pool.name}
          </h2>

          <p className="mt-3 max-w-sm leading-7 text-slate-600">
            {pool.description}
          </p>
        </div>

        <Badge>
          {pool.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Divider */}

      <div className="my-10 h-px bg-[#ECE8E1]" />

      {/* Stats */}

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Monthly
          </p>

          <p className="mt-2 text-2xl font-bold text-[#1F4D36]">
            {(Number(pool.contributionAmount) / 1e18).toFixed(4)} ETH
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Creator
          </p>

          <p className="mt-2 font-semibold text-slate-700">
            {pool.creator.slice(0, 6)}...
            {pool.creator.slice(-4)}
          </p>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-12">
        <Button
          href={`/communities/${Number(pool.id)}`}
          className="w-full"
        >
          View Community
        </Button>
      </div>
    </Card>
  );
}