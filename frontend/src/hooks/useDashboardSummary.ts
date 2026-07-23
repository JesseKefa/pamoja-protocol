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
    if (!address || !publicClient) return;

    async function load() {
      let totalSaved = BigInt(0);
      let monthlyCommitment = BigInt(0);

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
          monthlyCommitment += stats.contributionAmount;
        } catch {
          continue;
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