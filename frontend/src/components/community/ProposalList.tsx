"use client";

import { useState } from "react";

import CreateProposalButton from "./CreateProposalButton";
import CreateProposalModal from "./CreateProposalModal";

type Proposal = {
  id: bigint;
  title: string;
  description: string;
  proposer: string;
  yesVotes: bigint;
  noVotes: bigint;
  executed: boolean;
};

type Props = {
  proposals: Proposal[];
};

export default function ProposalList({
  proposals,
}: Props) {

  const [open, setOpen] = useState(false);

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
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

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        {proposals.length === 0 ? (

          <div className="p-10 text-center text-slate-500">
            No proposals yet.
          </div>

        ) : (

          proposals.map((proposal) => (

            <div
              key={proposal.id.toString()}
              className="border-b px-8 py-6 last:border-none"
            >

              <h3 className="text-xl font-bold">
                {proposal.title}
              </h3>

              <p className="mt-2 text-slate-600">
                {proposal.description}
              </p>

              <div className="mt-4 flex gap-8 text-sm text-slate-500">

                <span>
                  YES: {proposal.yesVotes.toString()}
                </span>

                <span>
                  NO: {proposal.noVotes.toString()}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

      <CreateProposalModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </section>
  );
}