"use client";

import { useWriteContract } from "wagmi";
import { toast } from "sonner";

import Pool from "@/contracts/Pool.json";
import { useHasVoted } from "@/hooks/useHasVoted";

type Proposal = {
  id: bigint;
  title: string;
  description: string;
  proposer: string;
  recipient: string;
  amount: bigint;
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

function shorten(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatAmount(amount: bigint) {
  return `${(Number(amount) / 1e18).toFixed(4)} ETH`;
}

export default function ProposalCard({
  proposal,
  poolAddress,
  onRefresh,
  onOpen,
}: Props) {
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

  function vote(support: boolean) {
    writeContract({
      address: poolAddress,
      abi: Pool.abi,
      functionName: "voteProposal",
      args: [
        proposal.id,
        support,
        "",
      ],
    });
  }

  return (
    <div
      onClick={onOpen}
      className="
        border-b
        border-slate-100
        px-8
        py-6
        last:border-none
        cursor-pointer
        transition
        hover:bg-slate-50
      "
    >
      <div className="flex items-start justify-between gap-8">

        {/* LEFT SIDE */}

        <div className="min-w-0 flex-1">

          <h3 className="text-xl font-bold text-slate-900">
            {proposal.title}
          </h3>

          <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">
            {proposal.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">

            {proposal.executed ? (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                Executed
              </span>
            ) : votingEnded ? (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                Voting ended
              </span>
            ) : (
              <span className="rounded-full bg-[#EEF5F1] px-3 py-1 text-sm font-semibold text-[#1F4D36]">
                Active
              </span>
            )}

            <span className="text-sm text-slate-400">
              Proposal #{proposal.id.toString()}
            </span>

          </div>

          {/* VOTING BUTTONS */}

          <div className="mt-5">

            {hasVoted ? (

              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                You already voted
              </span>

            ) : votingEnded ? (

              <span className="text-sm font-medium text-slate-400">
                Voting is closed
              </span>

            ) : (

              <div className="flex gap-3">

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    vote(true);
                  }}
                  className="
                    rounded-full
                    bg-[#1F4D36]
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#173C2B]
                  "
                >
                  Vote Yes
                </button>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    vote(false);
                  }}
                  className="
                    rounded-full
                    border
                    border-slate-200
                    px-5
                    py-2
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-100
                  "
                >
                  Vote No
                </button>

              </div>

            )}

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div
          className="
            w-56
            shrink-0
            space-y-4
            border-l
            border-slate-100
            pl-6
          "
        >

          {/* AMOUNT */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Amount
            </p>

            <p className="mt-1 text-xl font-black text-slate-900">
              {formatAmount(proposal.amount)}
            </p>
          </div>


          {/* PROPOSED BY */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Proposed by
            </p>

            <p className="mt-1 font-semibold text-[#1F4D36]">
              {shorten(proposal.proposer)}
            </p>
          </div>


          {/* VOTE COUNTS */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Votes
            </p>

            <div className="mt-2 flex flex-wrap gap-2">

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Yes ({proposal.yesVotes.toString()})
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                No ({proposal.noVotes.toString()})
              </span>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}