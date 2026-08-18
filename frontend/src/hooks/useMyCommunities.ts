import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";

import PoolABI from "@/contracts/Pool.json";
import { usePools } from "./usePools";

type Community = {
  id: number;
  name: string;
  treasury: bigint;
  members: number;
  contribution: bigint;
  poolAddress: `0x${string}`;
};

export function useMyCommunities() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { pools } = usePools();

  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    if (!address || !publicClient) {
      setCommunities([]);
      return;
    }

    const client = publicClient;
    const userAddress = address;

    async function load() {
      const mine: Community[] = [];

      for (const pool of pools) {
        try {
          const isMember =
            (await client.readContract({
              address: pool.poolAddress,
              abi: PoolABI.abi,
              functionName: "isMember",
              args: [userAddress],
            })) as boolean;

          if (!isMember) {
            continue;
          }

          const stats =
            (await client.readContract({
              address: pool.poolAddress,
              abi: PoolABI.abi,
              functionName: "getPoolStats",
            })) as {
              memberCount: bigint;
              treasury: bigint;
              contributionAmount: bigint;
            };

          mine.push({
            id: Number(pool.id),
            name: pool.name,
            treasury: stats.treasury,
            members: Number(stats.memberCount),
            contribution: stats.contributionAmount,
            poolAddress: pool.poolAddress,
          });
        } catch (error) {
          console.error(
            `Failed to load community ${pool.name}:`,
            error
          );
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