"use client";

import { useEffect, useState } from "react";
import ProposalCard from "./ProposalCard";
import CreateProposalButton from "./CreateProposalButton";
import CreateProposalModal from "./CreateProposalModal";
import ProposalDetailsModal from "./ProposalDetailsModal";

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
  proposals: Proposal[];
  poolAddress: `0x${string}`;
  onProposalCreated: () => void;
};

export default function ProposalList({
  proposals,
  poolAddress,
  onProposalCreated,
}: Props) {
  const [open, setOpen] = useState(false);

  const [selectedProposal, setSelectedProposal] =
  useState<Proposal | null>(null);
 
  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">Proposals</h2>
          <p className="mt-2 text-slate-500">
            Community governance proposals.
          </p>
        </div>

        <CreateProposalButton onClick={() => setOpen(true)} />
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        {proposals.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No proposals yet.
          </div>
        ) : (
          
            proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id.toString()}
                proposal={proposal}
                poolAddress={poolAddress}
                onRefresh={onProposalCreated}
                onOpen={() => setSelectedProposal(proposal)}
              />
            ))

            )}
                </div>


      <CreateProposalModal
        poolAddress={poolAddress}
        open={open}
        onClose={() => setOpen(false)}
        onProposalCreated={onProposalCreated}
      />

      <ProposalDetailsModal
          open={selectedProposal !== null}
          proposal={selectedProposal}
          poolAddress={poolAddress}
          onClose={() => setSelectedProposal(null)}
      />   
      
    </section>
  );
}