import Link from "next/link";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

export default function CommunityCard({ pool }: any) {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-900">
          {pool.name}
        </h2>

        <Badge>Active</Badge>

      </div>

      <p className="mt-4 text-slate-500">
        {pool.description}
      </p>

      <div className="mt-8 space-y-3 text-sm">

        <div className="flex justify-between">

          <span className="text-slate-500">
            Monthly
          </span>

          <span className="font-semibold">
            {Number(pool.contributionAmount) / 1e18} ETH
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-slate-500">
            Creator
          </span>

          <span className="font-medium">
            {pool.creator.slice(0, 6)}...
            {pool.creator.slice(-4)}
          </span>

        </div>

      </div>

      <Link
        href={`/community/${pool.poolAddress}`}
        className="mt-8 block"
      >
        <Button className="w-full">
          View Community
        </Button>
      </Link>

    </Card>
  );
}