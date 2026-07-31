"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useWriteContract } from "wagmi";
import { toast } from "sonner";

import Pool from "@/contracts/Pool.json";

type Props = {
  open: boolean;
  onClose: () => void;
  proposalId: bigint;
  poolAddress: `0x${string}`;
  onSuccess: () => void;
};

export default function VoteNoModal({
  open,
  onClose,
  proposalId,
  poolAddress,
  onSuccess,
}: Props) {
  const [reason, setReason] = useState("");

  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess() {
        toast.success("Vote submitted.");
        setReason("");
        onClose();
        onSuccess();
      },

      onError(error) {
        console.error(error);
        toast.error("Voting failed.");
      },
    },
  });

  if (!open) return null;

  function submitVote() {
    if (!reason.trim()) {
      toast.error("Please provide a reason.");
      return;
    }

    writeContract({
      address: poolAddress,
      abi: Pool.abi,
      functionName: "voteProposal",
      args: [
        Number(proposalId),
        false,
        reason,
      ],
    });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black">
            Vote Against Proposal
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <p className="mb-4 text-slate-600">
          Please explain why you are voting against this proposal.
        </p>

        <textarea
          value={reason}
          maxLength={200}
          onChange={(e) => setReason(e.target.value)}
          rows={5}
          className="w-full rounded-xl border p-4 outline-none focus:border-[#1F4D36]"
          placeholder="Explain your concerns..."
        />

        <div className="mt-2 text-right text-sm text-slate-500">
          {reason.length}/200
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={submitVote}
            className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white"
          >
            Submit Vote
          </button>
        </div>
      </div>
    </div>
  );
}