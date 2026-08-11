"use client";

import { useParams } from "next/navigation";
import { useAccount, useWriteContract } from "wagmi";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";

import { usePool } from "@/hooks/usePool";
import { usePoolStats } from "@/hooks/usePoolStats";
import { usePendingApplicants } from "@/hooks/usePendingApplicants";
import { useMembers } from "@/hooks/useMembers";
import { usePoolEvents } from "@/hooks/usePoolEvents";
import { useProposals } from "@/hooks/useProposals";

import Pool from "@/contracts/Pool.json";

import CommunityHero from "@/components/community/CommunityHero";
import CommunityStats from "@/components/community/CommunityStats";
import CommunityActions from "@/components/community/CommunityActions";
import PendingRequests from "@/components/community/PendingRequests";
import MemberList from "@/components/community/MemberList";
import ActivityFeed from "@/components/community/ActivityFeed";
import ProposalList from "@/components/community/ProposalList";


export default function CommunityDetailPage() {
  const params = useParams();

  const id = Number(params.id);

  const { address } = useAccount();

  const { pool, isLoading, error } = usePool(id);

  const poolStats = usePoolStats(
    pool?.poolAddress as `0x${string}`
  );

  const {
    memberCount,
    treasury,
    isMember,
    hasPendingRequest,
  } = poolStats;

  const pending = usePendingApplicants(
    pool?.poolAddress as `0x${string}`
  );

  const { applicants } = pending;

  const membersHook = useMembers(
    pool?.poolAddress as `0x${string}`
  );

  const { members } = membersHook;

  const events = usePoolEvents(
    pool?.poolAddress as `0x${string}`
  );

  const { activities } = events;

  const proposalsHook = useProposals(
    pool?.poolAddress as `0x${string}`
  );

  const { proposals } = proposalsHook;

  const { writeContract } = useWriteContract({
    mutation: {
      async onSuccess() {
        toast.success("Transaction confirmed.");

        await Promise.all([
          poolStats.refetch(),
          pending.refetch(),
          membersHook.refetch(),
          events.refetch(),
        ]);
      },

      onError(error) {
        console.error(error);

        if (error.message.includes("Already a member")) {
          toast.error("You are already a member.");
        } else if (
          error.message.includes("Already applied")
        ) {
          toast.error(
            "You already have a pending application."
          );
        } else if (
          error.message.includes("Not a member")
        ) {
          toast.error(
            "You must first become a member."
          );
        } else if (
          error.message.includes(
            "Incorrect contribution amount"
          )
        ) {
          toast.error(
            "Incorrect contribution amount."
          );
        } else {
          toast.error("Transaction failed.");
        }
      },
    },
  });

  if (isLoading) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-20">
          Loading community...
        </main>
      </>
    );
  }

  if (error || !pool) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-20">
          Community not found.
        </main>
      </>
    );
  }

  const currentPool = pool;

  function handleJoin() {
    writeContract({
      address: currentPool.poolAddress,
      abi: Pool.abi,
      functionName: "applyToJoin",
    });
  }

  function handleContribute() {
    writeContract({
      address: currentPool.poolAddress,
      abi: Pool.abi,
      functionName: "contribute",
      value: currentPool.contributionAmount,
    });
  }

  function handleApprove(
    applicant: `0x${string}`
  ) {
    writeContract({
      address: currentPool.poolAddress,
      abi: Pool.abi,
      functionName: "approveMember",
      args: [applicant],
    });
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">

        <CommunityHero pool={pool} />

        <CommunityStats
          pool={pool}
          treasury={treasury}
          memberCount={memberCount}
        />

        <CommunityActions
          isAdmin={address === currentPool.creator}
          isMember={isMember}
          hasPendingRequest={hasPendingRequest}
          onJoin={handleJoin}
          onContribute={handleContribute}
        />

        <PendingRequests
          isAdmin={address === currentPool.creator}
          applicants={applicants}
          onApprove={handleApprove}
        />

        <ProposalList
          proposals={proposals}
          poolAddress={currentPool.poolAddress}
          onProposalCreated={proposalsHook.refetch}
        />

        <MemberList
          members={members}
          admin={currentPool.creator}
        />

        <ActivityFeed
          activities={activities}
        />

        
      </main>
    </>
  );
}