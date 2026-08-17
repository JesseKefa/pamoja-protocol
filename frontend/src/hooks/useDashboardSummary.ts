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
  monthlyCommitment: string;
};

export function useDashboardSummary() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { communities } = useMyCommunities();
  const { applications } = usePendingCommunities();

  const [summary, setSummary] = useState<Summary>({
    communities: 0,
    pendingApplications: 0,
    totalSaved: "0",
    monthlyCommitment: "0",
  });

  useEffect(() => {
    if (!address || !publicClient) {
      setSummary({
        communities: communities.length,
        pendingApplications: applications.length,
        totalSaved: "0",
        monthlyCommitment: "0",
      });

      return;
    }

    const client = publicClient;
    const userAddress = address;

    async function load() {
      let totalSaved = 0n;
      let monthlyCommitment = 0n;

      for (const community of communities) {
        try {
          const contribution =
            (await client.readContract({
              address: community.poolAddress,
              abi: PoolABI.abi,
              functionName: "getContribution",
              args: [userAddress],
            })) as bigint;

          const stats =
            (await client.readContract({
              address: community.poolAddress,
              abi: PoolABI.abi,
              functionName: "getPoolStats",
            })) as {
              memberCount: bigint;
              treasury: bigint;
              contributionAmount: bigint;
            };

          totalSaved += contribution;
          monthlyCommitment += stats.contributionAmount;
        } catch (error) {
          console.error(
            `Failed to load dashboard data for ${community.name}:`,
            error
          );
        }
      }

      setSummary({
        communities: communities.length,
        pendingApplications: applications.length,
        totalSaved: Number(formatEther(totalSaved)).toFixed(3),
        monthlyCommitment: Number(
          formatEther(monthlyCommitment)
        ).toFixed(3),
      });
    }

    load();
  }, [
    address,
    publicClient,
    communities,
    applications,
  ]);

  return summary;
}