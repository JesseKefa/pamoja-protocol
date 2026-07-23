import { useReadContract } from "wagmi";

import PoolABI from "@/contracts/Pool.json";

export function useMembers(poolAddress: `0x${string}`) {
  const { data, isLoading, refetch } = useReadContract({
    address: poolAddress,
    abi: PoolABI.abi,
    functionName: "getMembers",
    query: {
      enabled: !!poolAddress,
    },
  });

  return {
    members: (data as `0x${string}`[]) ?? [],
    isLoading,
    refetch,
  };
}