import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { formatEther } from "viem";

import { useMyCommunities } from "./useMyCommunities";
import { usePendingCommunities } from "./usePendingCommunities";

import PoolABI from "@/contracts/Pool.json";

type Summary = {
  communities: number;
  pendingApplications: number;
  totalSaved: string;
  contributionCommitment: string;
};

export function useDashboardSummary(): Summary {
  const { address } = useAccount();

  const publicClient = usePublicClient();

  const { communities } = useMyCommunities();
  const { applications } = usePendingCommunities();

  const [summary, setSummary] = useState<Summary>({
    communities: 0,
    pendingApplications: 0,
    totalSaved: "0",
    contributionCommitment: "0",
  });

  useEffect(() => {
    if (!address || !publicClient) {
      setSummary({
        communities: 0,
        pendingApplications: applications.length,
        totalSaved: "0",
        contributionCommitment: "0",
      });

      return;
    }

    let cancelled = false;

    async function load() {
      let totalSaved = 0n;
      let contributionCommitment = 0n;

      for (const community of communities) {
        try {
          const contribution =
            (await publicClient.readContract({
              address: community.poolAddress,
              abi: PoolABI.abi,
              functionName: "getContribution",
              args: [address],
            })) as bigint;

          const stats =
            (await publicClient.readContract({
              address: community.poolAddress,
              abi: PoolABI.abi,
              functionName: "getPoolStats",
            })) as {
              memberCount: bigint;
              treasury: bigint;
              contributionAmount: bigint;
            };

          totalSaved += contribution;
          contributionCommitment +=
            stats.contributionAmount;
        } catch (error) {
          console.error(
            `Failed to load community ${community.poolAddress}`,
            error
          );
        }
      }

      if (cancelled) return;

      setSummary({
        communities: communities.length,
        pendingApplications: applications.length,
        totalSaved: Number(
          formatEther(totalSaved)
        ).toFixed(3),
        contributionCommitment: Number(
          formatEther(contributionCommitment)
        ).toFixed(3),
      });
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [
    address,
    publicClient,
    communities,
    applications,
  ]);

  return summary;
}