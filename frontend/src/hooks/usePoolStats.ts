import { useAccount, useReadContract } from "wagmi";
import PoolABI from "@/contracts/Pool.json";

export function usePoolStats(poolAddress: `0x${string}`) {
  const { address } = useAccount();

  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useReadContract({
    address: poolAddress,
    abi: PoolABI.abi,
    functionName: "getPoolStats",
    query: {
      enabled: !!poolAddress,
    },
  });

  const {
    data: member,
    isLoading: memberLoading,
    refetch: refetchMember,
  } = useReadContract({
    address: poolAddress,
    abi: PoolABI.abi,
    functionName: "getMemberInfo",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!poolAddress,
    },
  });


  return {
    memberCount: stats?.memberCount ?? 0,
    treasury: stats?.treasury ?? BigInt(0),
    contributionAmount: stats?.contributionAmount ?? BigInt(0),

    isMember: member?.[0] ?? false,
    totalSavedByUser: member?.[1] ?? BigInt(0),
    hasPendingRequest: member?.[2] ?? false,

    isLoading: statsLoading || memberLoading,

    refetch() {
      refetchStats();
      refetchMember();
  },
};
}