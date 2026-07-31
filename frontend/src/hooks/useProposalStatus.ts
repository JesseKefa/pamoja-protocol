"use client";

import { useReadContract } from "wagmi";
import Pool from "@/contracts/Pool.json";

export function useProposalStatus(
  poolAddress: `0x${string}`,
  proposalId: bigint
) {
  const { data, refetch, isLoading } = useReadContract({
    address: poolAddress,
    abi: Pool.abi,
    functionName: "getProposalStatus",
    args: [Number(proposalId)],
  });

  return {
    status: data as number | undefined,
    refetch,
    isLoading,
  };
}