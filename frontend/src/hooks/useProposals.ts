"use client";

import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";

import PoolABI from "@/contracts/Pool.json";

export type Proposal = {
  id: bigint;
  proposalType: number;

  title: string;
  description: string;

  proposer: `0x${string}`;

  recipient: `0x${string}`;
  amount: bigint;

  evidenceURI: string;

  newContributionAmount: bigint;
  newAdmin: `0x${string}`;

  yesVotes: bigint;
  noVotes: bigint;

  endTime: bigint;

  executed: boolean;
};

export function useProposals(
  poolAddress?: `0x${string}`
) {
  const publicClient = usePublicClient();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  async function refetch() {
    if (!poolAddress || !publicClient) {
      setProposals([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const data = (await publicClient.readContract({
        address: poolAddress,
        abi: PoolABI.abi,
        functionName: "getProposals",
      })) as Proposal[];

      setProposals(data);
    } catch (error) {
      console.error("Failed to load proposals:", error);
      setProposals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!poolAddress || !publicClient) {
      setProposals([]);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);

      try {
        const data = (await publicClient.readContract({
          address: poolAddress,
          abi: PoolABI.abi,
          functionName: "getProposals",
        })) as Proposal[];

        setProposals(data);
      } catch (error) {
        console.error("Failed to load proposals:", error);
        setProposals([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [poolAddress, publicClient]);

  return {
    proposals,
    isLoading: loading,
    refetch,
  };
}