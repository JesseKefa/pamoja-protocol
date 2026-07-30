"use client";

import { useReadContract } from "wagmi";

import Pool from "@/contracts/Pool.json";

type Vote = {
  voter: string;
  support: boolean;
  reason: string;
  timestamp: bigint;
};

export function useProposalVotes(
  poolAddress: `0x${string}`,
  proposalId: bigint
) {
  const { data, isLoading, refetch } = useReadContract({
    address: poolAddress,
    abi: Pool.abi,
    functionName: "getProposalVotes",
    args: [Number(proposalId)],
  });

  return {
    votes: (data as Vote[]) ?? [],
    isLoading,
    refetch,
  };
}