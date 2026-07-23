import { useAccount } from "wagmi";
import { usePools } from "./usePools";
import { usePublicClient } from "wagmi";
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
    if (!address || !publicClient) return;

    async function load() {
      const pending: PendingCommunity[] = [];

      for (const pool of pools) {
        try {
          const hasPending =
            (await publicClient.readContract({
              address: pool.poolAddress,
              abi: PoolABI.abi,
              functionName: "hasPendingRequest",
              args: [address],
            })) as boolean;

          if (!hasPending) continue;

          pending.push({
            id: pool.id,
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