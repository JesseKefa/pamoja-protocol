"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { toast } from "sonner";

import Pool from "@/contracts/Pool.json";
import { useHasVoted } from "@/hooks/useHasVoted";
import VoteNoModal from "./VoteNoModal";

type Proposal = {
  id: bigint;
  title: string;
  description: string;
  proposer: string;
  yesVotes: bigint;
  noVotes: bigint;
  endTime: bigint;
  executed: boolean;
};

type Props = {
  proposal: Proposal;
  poolAddress: `0x${string}`;
  onRefresh: () => void;
  onOpen: () => void;
};

export default function ProposalCard({
  proposal,
  poolAddress,
  onRefresh,
  onOpen,
}: Props) {
  const [showVoteNoModal, setShowVoteNoModal] =
    useState(false);

  const { hasVoted } = useHasVoted(
    poolAddress,
    proposal.id
  );

  const { writeContract } = useWriteContract({
    mutation: {
      async onSuccess() {
        toast.success("Vote submitted.");
        onRefresh();
      },

      onError(error) {
        console.error(error);
        toast.error("Voting failed.");
      },
    },
  });

  const now = Math.floor(Date.now() / 1000);

  const secondsLeft =
    Number(proposal.endTime) - now;

  const votingEnded = secondsLeft <= 0;

  function voteYes() {
    writeContract({
      address: poolAddress,
      abi: Pool.abi,
      functionName: "voteProposal",
      args: [
        Number(proposal.id),
        true,
        "",
      ],
    });
  }

  return (
    <>
      <div
        onClick={onOpen}
        className="
          border-b
          px-8
          py-6
          last:border-none
          cursor-pointer
          transition
          hover:bg-slate-50
        "
      >
        <h3 className="text-xl font-bold">
          {proposal.title}
        </h3>

        <p className="mt-2 text-slate-600">
          {proposal.description}
        </p>

        <p className="mt-4 text-sm text-slate-500">
          Proposed by{" "}
          <span className="font-medium text-slate-700">
            {proposal.proposer.slice(0, 6)}...
            {proposal.proposer.slice(-4)}
          </span>
        </p>

        <div className="mt-4 flex gap-6">
          <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Yes {proposal.yesVotes.toString()}
          </div>

          <div className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
            No {proposal.noVotes.toString()}
          </div>
        </div>

        <div className="mt-4">
          {hasVoted ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              You already voted
            </span>
          ) : votingEnded ? (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              Voting ended
            </span>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  voteYes();
                }}
                className="rounded-full bg-[#1F4D36] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#173C2B]"
              >
                Support Proposal
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVoteNoModal(true);
                }}
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold transition hover:bg-slate-50"
              >
                Vote Against
              </button>
            </div>
          )}
        </div>
      </div>

      <VoteNoModal
        open={showVoteNoModal}
        onClose={() =>
          setShowVoteNoModal(false)
        }
        proposalId={proposal.id}
        poolAddress={poolAddress}
        onSuccess={onRefresh}
      />
    </>
  );
}