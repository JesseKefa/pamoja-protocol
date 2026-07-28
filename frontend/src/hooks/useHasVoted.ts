"use client";

import { useReadContract, useAccount } from "wagmi";
import Pool from "@/contracts/Pool.json";

export function useHasVoted(
  poolAddress?: `0x${string}`,
  proposalId?: bigint
) {
  const { address } = useAccount();

  const { data, refetch } = useReadContract({
    address: poolAddress,
    abi: Pool.abi,
    functionName: "hasVoted",
    args:
      poolAddress && proposalId && address
        ? [proposalId, address]
        : undefined,
    query: {
      enabled:
        !!poolAddress &&
        !!proposalId &&
        !!address,
    },
  });

  return {
    hasVoted: Boolean(data),
    refetch,
  };
}