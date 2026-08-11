import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";

import { usePools } from "./usePools";

import PoolABI from "@/contracts/Pool.json";

type Community = {
  id: number;
  name: string;
  treasury: bigint;
  members: number;
  contribution: bigint;
  contributionAmount: bigint;
  poolAddress: `0x${string}`;
};

export function useMyCommunities() {
  const { address } = useAccount();

  const publicClient = usePublicClient();

  const { pools } = usePools();

  const [communities, setCommunities] = useState<
    Community[]
  >([]);

  useEffect(() => {
    if (!address || !publicClient) {
      setCommunities([]);
      return;
    }

    let cancelled = false;

    async function load() {
      const mine: Community[] = [];

      for (const pool of pools) {
        try {
          const isMember =
            (await publicClient.readContract({
              address: pool.poolAddress,
              abi: PoolABI.abi,
              functionName: "isMember",
              args: [address],
            })) as boolean;

          if (!isMember) continue;

          const stats =
            (await publicClient.readContract({
              address: pool.poolAddress,
              abi: PoolABI.abi,
              functionName: "getPoolStats",
            })) as {
              memberCount: bigint;
              treasury: bigint;
              contributionAmount: bigint;
            };

          const contribution =
            (await publicClient.readContract({
              address: pool.poolAddress,
              abi: PoolABI.abi,
              functionName: "getContribution",
              args: [address],
            })) as bigint;

          mine.push({
            id: pool.id,
            name: pool.name,
            treasury: stats.treasury,
            members: Number(stats.memberCount),
            contribution,
            contributionAmount:
              stats.contributionAmount,
            poolAddress: pool.poolAddress,
          });
        } catch (error) {
          console.error(
            `Failed to load community ${pool.poolAddress}`,
            error
          );
        }
      }

      if (!cancelled) {
        setCommunities(mine);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [address, pools, publicClient]);

  return {
    communities,
  };
}