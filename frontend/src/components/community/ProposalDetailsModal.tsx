"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useProposalVotes } from "@/hooks/useProposalVotes";
import { useProposalStatus } from "@/hooks/useProposalStatus";
import ExecuteProposalButton from "./ExecuteProposalButton";

type Proposal = {
  id: bigint;
  title: string;
  description: string;
  proposer: string;
  recipient: string;
  amount: bigint;
  evidenceURI: string;
  yesVotes: bigint;
  noVotes: bigint;
  endTime: bigint;
  executed: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  proposal: Proposal | null;
  poolAddress: `0x${string}`;
};

function shorten(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function ProposalDetailsModal({
  open,
  onClose,
  proposal,
  poolAddress,
}: Props) {
  const proposalId = proposal?.id ?? 0n;
  
  const { votes } = useProposalVotes(
    poolAddress,
    proposalId
  );

  const { status } = useProposalStatus(
    poolAddress,
    proposalId
  );

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!open || !proposal) return null;

  const secondsLeft = Math.max(
    0,
    Number(proposal.endTime) - Math.floor(now / 1000)
  );

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const votingEnded = secondsLeft === 0;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        justify-end
        bg-black/40
        backdrop-blur-sm
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          h-full
          w-full
          max-w-xl
          overflow-y-auto
          bg-white
          p-8
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black">
            Proposal Details
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-slate-100
            "
          >
            <X />
          </button>
        </div>

        {/* Title */}

        <h3 className="text-2xl font-bold">
          {proposal.title}
        </h3>

        <p className="mt-3 leading-relaxed text-slate-600">
          {proposal.description}
        </p>

        {/* Proposal Info */}

        <div className="mt-8 space-y-5">

          <div>
            <p className="text-sm text-slate-500">
              Proposed By
            </p>

            <p className="mt-1 font-medium text-[#1F4D36]">
              {shorten(proposal.proposer)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Recipient
            </p>

            <p className="mt-1 font-medium">
              {shorten(proposal.recipient)}
            </p>
          </div>

        </div>

        {/* Amount */}

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">

          <p className="text-sm text-slate-500">
            Treasury Request
          </p>

          <p className="mt-2 text-3xl font-black">
            {(Number(proposal.amount) / 1e18).toFixed(4)} ETH
          </p>

        </div>

        {/* Status */}

        <div className="mt-6">

          {status === 0 && (
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                  Active
              </span>
          )}

          {status === 1 && (
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Passed
              </span>
          )}

          {status === 2 && (
              <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                  Rejected
              </span>
          )}

          {status === 3 && (
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  Executed
              </span>
          )}

          {status === 4 && (
              <span className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                  Quorum Not Reached
              </span>
          )}

        </div>


        {/* Voting Countdown */}

        <div className="mt-8 rounded-2xl border border-slate-200 p-5">

          <p className="text-sm text-slate-500">
            Voting Period
          </p>

          {votingEnded ? (

            <p className="mt-2 text-lg font-bold text-red-600">
              Voting has ended
            </p>

          ) : (

            <div className="mt-3">

              <p className="text-2xl font-black text-[#1F4D36]">
                {days}d {hours}h {minutes}m {seconds}s
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Remaining before execution becomes available.
              </p>

            </div>

          )}

        </div>

        <div className="mt-10">
          <h4 className="text-xl font-bold">
            Voting History
          </h4>

          <div className="mt-5 space-y-4">

            {votes.length === 0 ? (

              <div className="rounded-xl bg-slate-50 p-5 text-slate-500">
                No votes yet.
              </div>

            ) : (

              votes.map((vote, index) => (

                <div
                  key={index}
                  className="rounded-2xl border p-5"
                >
                  <div className="flex items-center justify-between">

                    <div>

                      <p className="font-semibold">
                        {vote.voter.slice(0, 6)}...
                        {vote.voter.slice(-4)}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {new Date(
                          Number(vote.timestamp) * 1000
                        ).toLocaleString()}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        vote.support
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {vote.support ? "YES" : "NO"}
                    </span>

                  </div>

                  {!vote.support && vote.reason && (

                    <div className="mt-4 rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">
                        Reason
                      </p>

                      <p className="mt-2 leading-relaxed">
                        {vote.reason}
                      </p>
                    </div>

                  )}

                </div>

              ))

            )}

          </div>
        </div>

        {/* Supporting Document */}

        {proposal.evidenceURI && (

          <div className="mt-8">

            <p className="mb-2 text-sm text-slate-500">
              Supporting Document
            </p>

            <a
              href={proposal.evidenceURI}
              target="_blank"
              rel="noreferrer"
              className="
                break-all
                text-[#1F4D36]
                underline
              "
            >
              {proposal.evidenceURI}
            </a>

          </div>

        )}

        {/* Voting */}

        <div className="mt-10">

          <h4 className="font-bold">
            Voting Results
          </h4>

          <div className="mt-4 flex gap-4">

            <div className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
              👍 Yes {proposal.yesVotes.toString()}
            </div>

            <div className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">
              👎 No {proposal.noVotes.toString()}
            </div>

            {status === 1 && !proposal.executed && (
              <ExecuteProposalButton
                proposalId={proposal.id}
                poolAddress={poolAddress}
                onExecuted={() => {
                  window.location.reload();
                }}
              />
            )}

          </div>

        </div>

        

      </div>
    </div>
  );
}