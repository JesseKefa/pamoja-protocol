"use client";

import { useWriteContract } from "wagmi";
import { toast } from "sonner";

import Pool from "@/contracts/Pool.json";

type Props = {
  proposalId: bigint;
  poolAddress: `0x${string}`;
  onExecuted: () => void;
};

export default function ExecuteProposalButton({
  proposalId,
  poolAddress,
  onExecuted,
}: Props) {
  const { writeContract } = useWriteContract({
    mutation: {
      async onSuccess() {
        toast.success("Proposal executed.");
        onExecuted();
      },

      onError(error) {
        console.error(error);
        toast.error("Execution failed.");
      },
    },
  });

  function execute() {
    writeContract({
      address: poolAddress,
      abi: Pool.abi,
      functionName: "executeProposal",
      args: [Number(proposalId)],
    });
  }

  return (
    <button
      onClick={execute}
      className="
        mt-8
        w-full
        rounded-2xl
        bg-[#1F4D36]
        py-3
        font-semibold
        text-white
        transition
        hover:bg-[#173C2B]
      "
    >
      Execute Proposal
    </button>
  );
}