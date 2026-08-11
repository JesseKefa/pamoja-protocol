import { useMemo } from "react";
import { usePools } from "./usePools";

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

export function useDashboard() {
  const {
    pools,
    isLoading,
    error,
  } = usePools();

  const stats = useMemo(() => {
    const totalCommunities = pools.length;

    const totalSaved = pools.reduce(
      (sum: bigint, pool: Pool) => {
        return sum + pool.contributionAmount;
      },
      0n
    );

    return {
      totalCommunities,
      totalSaved,
      pendingRequests: 0,
      monthlyContribution: 0n,
    };
  }, [pools]);

  return {
    pools,
    stats,
    isLoading,
    error,
  };
}