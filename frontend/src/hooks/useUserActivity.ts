import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";

import PoolABI from "@/contracts/Pool.json";
import { usePools } from "./usePools";

export type Activity = {
  type: string;
  community: string;
  amount?: bigint;
};

export function useUserActivity() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { pools } = usePools();

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!address || !publicClient) return;

    async function load() {
      const all: Activity[] = [];

      for (const pool of pools) {
        try {
          const [joins, approvals, contributions] =
            await Promise.all([
              publicClient.getLogs({
                address: pool.poolAddress,
                abi: PoolABI.abi,
                eventName: "JoinRequested",
                fromBlock: BigInt(0),
              }),

              publicClient.getLogs({
                address: pool.poolAddress,
                abi: PoolABI.abi,
                eventName: "MemberApproved",
                fromBlock: BigInt(0),
              }),

              publicClient.getLogs({
                address: pool.poolAddress,
                abi: PoolABI.abi,
                eventName: "ContributionMade",
                fromBlock: BigInt(0),
              }),
            ]);

          joins.forEach((event: any) => {
            const applicant =
              event.args?.applicant ??
              event.topics?.[1];

            if (
              applicant?.toLowerCase() !==
              address.toLowerCase()
            )
              return;

            all.push({
              type: "Join Request",
              community: pool.name,
            });
          });

          approvals.forEach((event: any) => {
            const applicant =
              event.args?.applicant ??
              event.topics?.[1];

            if (
              applicant?.toLowerCase() !==
              address.toLowerCase()
            )
              return;

            all.push({
              type: "Approved",
              community: pool.name,
            });
          });

          contributions.forEach((event: any) => {
            const member =
              event.args?.member ??
              event.topics?.[1];

            if (
              member?.toLowerCase() !==
              address.toLowerCase()
            )
              return;

            all.push({
              type: "Contribution",
              community: pool.name,
              amount: event.args?.amount,
            });
          });
        } catch {
          continue;
        }
      }

      setActivities(all.reverse());
    }

    load();
  }, [address, pools, publicClient]);

  return {
    activities,
  };
}