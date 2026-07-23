import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { usePools } from "./usePools";
import { usePublicClient } from "wagmi";

import PoolABI from "@/contracts/Pool.json";

type Community = {
  id: number;
  name: string;
  treasury: bigint;
  members: number;
  poolAddress: `0x${string}`;
};

export function useMyCommunities() {
  const { address } = useAccount();

  const publicClient = usePublicClient();

  const { pools } = usePools();

  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    if (!address || !publicClient) return;

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

          mine.push({
            id: pool.id,
            name: pool.name,
            treasury: stats.treasury,
            members: Number(stats.memberCount),
            poolAddress: pool.poolAddress,
          });
        } catch {
          continue;
        }
      }

      setCommunities(mine);
    }

    load();
  }, [address, pools, publicClient]);

  return {
    communities,
  };
}