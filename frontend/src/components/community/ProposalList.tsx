"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import ProposalCard from "./ProposalCard";
import CreateProposalButton from "./CreateProposalButton";
import CreateProposalModal from "./CreateProposalModal";
import ProposalDetailsModal from "./ProposalDetailsModal";
import { useProposalStatus } from "@/hooks/useProposalStatus";

type Proposal = {
  id: bigint;
  proposalType: number;

  title: string;
  description: string;

  proposer: `0x${string}`;

  recipient: `0x${string}`;
  amount: bigint;

  evidenceURI: string;

  newContributionAmount: bigint;
  newAdmin: `0x${string}`;

  yesVotes: bigint;
  noVotes: bigint;

  endTime: bigint;

  executed: boolean;
};

type Props = {
  proposals: Proposal[];
  poolAddress: `0x${string}`;
  onProposalCreated: () => void;
};

type ProposalFilter =
  | "All"
  | "Active"
  | "Passed"
  | "Rejected"
  | "Executed"
  | "Quorum Not Reached";

function ProposalHistoryItem({
  proposal,
  poolAddress,
  onOpen,
  onRefresh,
}: {
  proposal: Proposal;
  poolAddress: `0x${string}`;
  onOpen: () => void;
  onRefresh: () => void;
}) {
  const { status } = useProposalStatus(
    poolAddress,
    proposal.id
  );

  return (
    <div>
      <ProposalCard
        proposal={proposal}
        poolAddress={poolAddress}
        onRefresh={onRefresh}
        onOpen={onOpen}
      />

      <div className="px-8 pb-4 -mt-3">
        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${
              status === 0
                ? "bg-yellow-100 text-yellow-700"
                : status === 1
                ? "bg-green-100 text-green-700"
                : status === 2
                ? "bg-red-100 text-red-700"
                : status === 3
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-200 text-slate-700"
            }
          `}
        >
          {status === 0 && "Active"}
          {status === 1 && "Passed"}
          {status === 2 && "Rejected"}
          {status === 3 && "Executed"}
          {status === 4 && "Quorum Not Reached"}
        </span>
      </div>
    </div>
  );
}

export default function ProposalList({
  proposals,
  poolAddress,
  onProposalCreated,
}: Props) {
  const [open, setOpen] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const [selectedProposal, setSelectedProposal] =
    useState<Proposal | null>(null);

  const [filter, setFilter] =
    useState<ProposalFilter>("All");

  const sortedProposals = useMemo(() => {
    return [...proposals].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );
  }, [proposals]);

  const recentProposals =
    sortedProposals.slice(0, 5);

  return (
    <section className="mt-16">
      {/* Header */}

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            Proposals
          </h2>

          <p className="mt-2 text-slate-500">
            Community governance proposals.
          </p>
        </div>

        <CreateProposalButton
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Recent proposals */}

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        {recentProposals.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No proposals yet.
          </div>
        ) : (
          recentProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id.toString()}
              proposal={proposal}
              poolAddress={poolAddress}
              onRefresh={onProposalCreated}
              onOpen={() =>
                setSelectedProposal(proposal)
              }
            />
          ))
        )}
      </div>

      {/* View all proposals */}

      {proposals.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="
              text-sm
              font-semibold
              text-slate-500
              transition
              hover:text-[#1F4D36]
            "
          >
            View complete proposal history →
          </button>
        </div>
      )}

      {/* Create Proposal Modal */}

      <CreateProposalModal
        poolAddress={poolAddress}
        open={open}
        onClose={() => setOpen(false)}
        onProposalCreated={onProposalCreated}
      />

      {/* Proposal Details Modal */}

      <ProposalDetailsModal
        open={selectedProposal !== null}
        proposal={selectedProposal}
        poolAddress={poolAddress}
        onClose={() => setSelectedProposal(null)}
      />

      {/* Proposal History Side Panel */}

      {showAll && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            justify-end
            bg-black/40
            backdrop-blur-sm
          "
          onClick={() => setShowAll(false)}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
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
            {/* Panel Header */}

            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  Proposal History
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Complete community governance history.
                </p>
              </div>

              <button
                onClick={() => setShowAll(false)}
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

            {/* Filters */}

            <div className="mb-6 flex flex-wrap gap-2">
              {(
                [
                  "All",
                  "Active",
                  "Passed",
                  "Rejected",
                  "Executed",
                  "Quorum Not Reached",
                ] as ProposalFilter[]
              ).map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition
                    ${
                      filter === option
                        ? "bg-[#1F4D36] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Proposal History */}

            <div className="overflow-hidden rounded-3xl border bg-white">
              {proposals.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  No proposals yet.
                </div>
              ) : (
                proposals.map((proposal) => (
                  <ProposalHistoryItem
                    key={proposal.id.toString()}
                    proposal={proposal}
                    poolAddress={poolAddress}
                    onRefresh={onProposalCreated}
                    onOpen={() => {
                      setSelectedProposal(proposal);
                      setShowAll(false);
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}