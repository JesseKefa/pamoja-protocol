import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import type { Log } from "viem";

import PoolABI from "@/contracts/Pool.json";
import { usePools } from "./usePools";

export type Activity = {
  type: string;
  community: string;
  amount?: bigint;
};

type Pool = {
  id: bigint;
  name: string;
  description: string;
  creator: `0x${string}`;
  poolAddress: `0x${string}`;
  createdAt: bigint;
  isActive: boolean;
  contributionAmount: bigint;
};

type EventLog = Log & {
  args?: {
    applicant?: `0x${string}`;
    member?: `0x${string}`;
    amount?: bigint;
  };
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

      for (const pool of pools as Pool[]) {
        try {
          const [joins, approvals, contributions] =
            await Promise.all([
              publicClient.getLogs({
                address: pool.poolAddress,
                abi: PoolABI.abi,
                eventName: "JoinRequested",
                fromBlock: 0n,
              }),

              publicClient.getLogs({
                address: pool.poolAddress,
                abi: PoolABI.abi,
                eventName: "MemberApproved",
                fromBlock: 0n,
              }),

              publicClient.getLogs({
                address: pool.poolAddress,
                abi: PoolABI.abi,
                eventName: "ContributionMade",
                fromBlock: 0n,
              }),
            ]);

          joins.forEach((event) => {
            const typedEvent = event as EventLog;

            const applicant =
              typedEvent.args?.applicant ??
              typedEvent.topics?.[1];

            if (
              typeof applicant !== "string" ||
              applicant.toLowerCase() !== address.toLowerCase()
            ) {
              return;
            }

            all.push({
              type: "Join Request",
              community: pool.name,
            });
          });

          approvals.forEach((event) => {
            const typedEvent = event as EventLog;

            const applicant =
              typedEvent.args?.applicant ??
              typedEvent.topics?.[1];

            if (
              typeof applicant !== "string" ||
              applicant.toLowerCase() !== address.toLowerCase()
            ) {
              return;
            }

            all.push({
              type: "Approved",
              community: pool.name,
            });
          });

          contributions.forEach((event) => {
            const typedEvent = event as EventLog;

            const member =
              typedEvent.args?.member ??
              typedEvent.topics?.[1];

            if (
              typeof member !== "string" ||
              member.toLowerCase() !== address.toLowerCase()
            ) {
              return;
            }

            all.push({
              type: "Contribution",
              community: pool.name,
              amount: typedEvent.args?.amount,
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