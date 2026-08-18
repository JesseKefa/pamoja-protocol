import { useAccount, useReadContract } from "wagmi";
import PoolABI from "@/contracts/Pool.json";

type PoolStats = {
  memberCount: bigint;
  treasury: bigint;
  contributionAmount: bigint;
};

type MemberInfo = readonly [
  boolean,
  bigint,
  boolean
];

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

  const typedStats = stats as PoolStats | undefined;
  const typedMember = member as MemberInfo | undefined;

  return {
    memberCount: typedStats?.memberCount ?? 0n,
    treasury: typedStats?.treasury ?? 0n,
    contributionAmount:
      typedStats?.contributionAmount ?? 0n,

    isMember: typedMember?.[0] ?? false,
    totalSavedByUser: typedMember?.[1] ?? 0n,
    hasPendingRequest: typedMember?.[2] ?? false,

    isLoading: statsLoading || memberLoading,

    refetch() {
      refetchStats();
      refetchMember();
    },
  };
}