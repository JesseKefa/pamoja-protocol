import { useReadContract } from "wagmi";

import PoolABI from "@/contracts/Pool.json";

export type Activity = {
  action: string;
  user: `0x${string}`;
  amount: bigint;
  timestamp: bigint;
};

export function usePoolEvents(
  poolAddress?: `0x${string}`
) {
  const { data, isLoading, refetch } = useReadContract({
    address: poolAddress,
    abi: PoolABI.abi,
    functionName: "getActivities",
    query: {
      enabled: !!poolAddress,
      refetchInterval: 3000,
    },
  });

  return {
    activities: (data as Activity[]) ?? [],
    isLoading,
    refetch,
  };
}