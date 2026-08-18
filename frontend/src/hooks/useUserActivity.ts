import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import type { Abi, AbiEvent, Log } from "viem";

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

function getEvent(abi: Abi, name: string): AbiEvent | undefined {
  const event = abi.find(
    (item): item is AbiEvent =>
      item.type === "event" && item.name === name
  );

  return event;
}

export function useUserActivity() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { pools } = usePools();

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!address || !publicClient || pools.length === 0) return;

    const client = publicClient;
    const userAddress = address;
    const abi = PoolABI.abi as Abi;

    const joinRequestedEvent = getEvent(
      abi,
      "JoinRequested"
    );

    const memberApprovedEvent = getEvent(
      abi,
      "MemberApproved"
    );

    const contributionMadeEvent = getEvent(
      abi,
      "ContributionMade"
    );

    if (
      !joinRequestedEvent ||
      !memberApprovedEvent ||
      !contributionMadeEvent
    ) {
      return;
    }

    async function load() {
      const all: Activity[] = [];

      for (const pool of pools as Pool[]) {
        try {
          const [joins, approvals, contributions] =
            await Promise.all([
              client.getLogs({
                address: pool.poolAddress,
                event: joinRequestedEvent,
                fromBlock: 0n,
              }),

              client.getLogs({
                address: pool.poolAddress,
                event: memberApprovedEvent,
                fromBlock: 0n,
              }),

              client.getLogs({
                address: pool.poolAddress,
                event: contributionMadeEvent,
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
              applicant.toLowerCase() !== userAddress.toLowerCase()
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
              applicant.toLowerCase() !== userAddress.toLowerCase()
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
              member.toLowerCase() !== userAddress.toLowerCase()
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