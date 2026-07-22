"use client";

import { useParams } from "next/navigation";
import { useAccount, useWriteContract } from "wagmi";

import Navbar from "@/components/Navbar";

import { usePool } from "@/hooks/usePool";
import { usePoolStats } from "@/hooks/usePoolStats";
import { usePendingApplicants } from "@/hooks/usePendingApplicants";

import Pool from "@/contracts/Pool.json";

import CommunityHero from "@/components/community/CommunityHero";
import CommunityStats from "@/components/community/CommunityStats";
import CommunityActions from "@/components/community/CommunityActions";
import PendingRequests from "@/components/community/PendingRequests";
import MemberList from "@/components/community/MemberList";
import ActivityFeed from "@/components/community/ActivityFeed";

export default function CommunityDetailPage() {
  const params = useParams();

  const id = Number(params.id);

  const { address } = useAccount();

  const { pool, isLoading, error } = usePool(id);

  const {
    memberCount,
    totalContributions,
  } = usePoolStats(pool?.poolAddress as `0x${string}`);

  const {
    applicants,
  } = usePendingApplicants(pool?.poolAddress as `0x${string}`);

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess() {
        alert("🎉 Transaction submitted!");
      },

      onError(error) {
        console.error(error);

        if (error.message.includes("Already a member")) {
          alert("You are already a member.");
        } else if (
          error.message.includes("Already applied")
        ) {
          alert("You already have a pending request.");
        } else if (
          error.message.includes("Not a member")
        ) {
          alert("You must be approved first.");
        } else {
          alert("Transaction failed.");
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

  function handleJoin() {
    writeContract({
      address: pool.poolAddress,
      abi: Pool.abi,
      functionName: "applyToJoin",
    });
  }

  function handleContribute() {
    writeContract({
      address: pool.poolAddress,
      abi: Pool.abi,
      functionName: "contribute",
      value: pool.contributionAmount,
    });
  }

  function handleApprove(
    applicant: `0x${string}`
  ) {
    writeContract({
      address: pool.poolAddress,
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
          treasury={totalContributions}
          memberCount={memberCount}
        />

        <CommunityActions
          onJoin={handleJoin}
          onContribute={handleContribute}
        />

        <PendingRequests
          isAdmin={address === pool.creator}
          applicants={applicants}
          onApprove={handleApprove}
        />

        <MemberList />

        <ActivityFeed />

      </main>
    </>
  );
}