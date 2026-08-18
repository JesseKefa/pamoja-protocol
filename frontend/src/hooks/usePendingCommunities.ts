import { useAccount, usePublicClient } from "wagmi";
import { usePools } from "./usePools";
import { useEffect, useState } from "react";

import PoolABI from "@/contracts/Pool.json";

type PendingCommunity = {
  id: number;
  name: string;
};

export function usePendingCommunities() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { pools } = usePools();

  const [applications, setApplications] = useState<
    PendingCommunity[]
  >([]);

  useEffect(() => {
    if (!address || !publicClient) {
      setApplications([]);
      return;
    }

    const client = publicClient;
    const userAddress = address;

    async function load() {
      const pending: PendingCommunity[] = [];

      for (const pool of pools) {
        try {
          const hasPending =
            (await client.readContract({
              address: pool.poolAddress,
              abi: PoolABI.abi,
              functionName: "hasPendingRequest",
              args: [userAddress],
            })) as boolean;

          if (!hasPending) continue;

          pending.push({
            id: Number(pool.id),
            name: pool.name,
          });
        } catch {
          continue;
        }
      }

      setApplications(pending);
    }

    load();
  }, [address, pools, publicClient]);

  return {
    applications,
  };
}