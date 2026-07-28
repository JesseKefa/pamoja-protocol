"use client";

import { usePoolStats } from "@/hooks/usePoolStats";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";

import Pool from "@/contracts/Pool.json";
import {
  Landmark,
  Coins,
  ShieldCheck,
  X,
} from "lucide-react";

type Props = {
  poolAddress: `0x${string}`;
  open: boolean;
  onClose: () => void;
  onProposalCreated: () => void;
};

export default function CreateProposalModal({
  poolAddress,
  open,
  onClose,
  onProposalCreated,
}: Props) {
  const { address } = useAccount();

  const {
    treasury,
  } = usePoolStats(poolAddress);

  const [proposalType, setProposalType] = useState("withdraw");

  const [supportingDocumentURI, setSupportingDocumentURI] =
    useState("");

  const [recipientType, setRecipientType] = useState<
    "self" | "other"
  >("self");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const requestedAmount =
    amount === ""
      ? 0n
      : BigInt(Math.floor(Number(amount) * 1e18));

  const insufficientTreasury =
    requestedAmount > treasury;

  useEffect(() => {
  function handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  window.addEventListener("keydown", handleEscape);

  return () =>
    window.removeEventListener(
      "keydown",
      handleEscape
    );
}, [onClose]);

useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [open]);


  const { writeContract } = useWriteContract({
    mutation: {
      onSuccess() {
        toast.success("Proposal submitted.");

        onProposalCreated();

        setTitle("");
        setDescription("");
        setSupportingDocumentURI("");
        setRecipient("");
        setAmount("");
        setRecipientType("self");

        onClose();
      },

      onError(error) {
        console.error(error);

        toast.error("Failed to create proposal.");
      },
    },
  });

  function handleSubmit() {
  const recipientAddress =
    recipientType === "self"
      ? address
      : recipient;

  if (!recipientAddress) {
    toast.error("Recipient required.");
    return;
  }

  writeContract({
      address: poolAddress,
      abi: Pool.abi,
      functionName: "createWithdrawalProposal",
      args: [
        title,
        description,
        supportingDocumentURI,
        recipientAddress,
        parseEther(amount),
      ],
    });
  }

  if (!open) return null;

  return (
      <div
        onClick={onClose}
        className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
        "
     >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
            w-full
            max-w-xl
            max-h-[90vh]
            overflow-y-auto
            scrollbar-hide
            rounded-3xl
            bg-white
            p-8
            shadow-2xl
        "
        >
        {/* Header */}

        <div className="mb-8 flex items-start justify-between">

          <div>

            <h2 className="text-3xl font-black">
              Create Proposal
            </h2>

            <p className="mt-2 text-slate-500">
              Submit a governance proposal for your community.
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Proposal Type */}

        <div className="mb-8">

          <p className="mb-4 font-semibold">
            Proposal Type
          </p>

          <div className="grid grid-cols-3 gap-4">

            <button
              onClick={() =>
                setProposalType("withdraw")
              }
              className={`
                flex
                flex-col
                items-center
                justify-center
                text-center
                rounded-2xl
                border
                p-5
                transition
                ${
                  proposalType === "withdraw"
                    ? "border-[#1F4D36] bg-[#EEF5F1]"
                    : "hover:border-slate-300"
                }
              `}
            >
              <Landmark
                size={30}
                className="mb-3 text-[#1F4D36]"
              />

              <div>

                <h3 className="font-bold">
                  Withdraw
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Treasury
                </p>

              </div>

            </button>

            <button
              disabled
              className="
                flex
                cursor-not-allowed
                items-start
                gap-4
                rounded-2xl
                border
                p-5
                text-left
                opacity-50
              "
            >
              <Coins
                size={24}
                className="mt-1"
              />

              <div>

                <h3 className="font-bold">
                  Change Contribution
                </h3>

                <p className="mt-1 text-sm">
                  Coming Soon
                </p>

              </div>

            </button>

            <button
              disabled
              className="
                flex
                cursor-not-allowed
                items-start
                gap-4
                rounded-2xl
                border
                p-5
                text-left
                opacity-50
              "
            >
              <ShieldCheck
                size={24}
                className="mt-1"
              />

              <div>

                <h3 className="font-bold">
                  Transfer Admin
                </h3>

                <p className="mt-1 text-sm">
                  Coming Soon
                </p>

              </div>

            </button>

          </div>

        </div>

        {/* Form */}

        <div className="space-y-5">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Proposal Title"
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              p-4
              outline-none
              transition
              focus:border-[#1F4D36]
            "
          />

          <textarea
            rows={4}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Describe your proposal..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              p-4
              outline-none
              transition
              focus:border-[#1F4D36]
            "
          />

          <input
            value={supportingDocumentURI}
            onChange={(e) =>
              setSupportingDocumentURI(e.target.value)
            }
            placeholder="Supporting document URL (optional)"
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              p-4
              outline-none
              transition
              focus:border-[#1F4D36]
            "
          />

          {/* Recipient */}

          <div className="space-y-4">

            <label className="font-semibold">
              Recipient
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  setRecipientType("self")
                }
                className={`
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition
                  ${
                    recipientType === "self"
                      ? "border-[#1F4D36] bg-[#EEF5F1]"
                      : "border-slate-200 hover:border-slate-300"
                  }
                `}
              >
                <p className="font-semibold">
                  My Wallet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Use the connected wallet.
                </p>

              </button>

              <button
                type="button"
                onClick={() =>
                  setRecipientType("other")
                }
                className={`
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition
                  ${
                    recipientType === "other"
                      ? "border-[#1F4D36] bg-[#EEF5F1]"
                      : "border-slate-200 hover:border-slate-300"
                  }
                `}
              >
                <p className="font-semibold">
                  Another Wallet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Specify another recipient.
                </p>

              </button>

            </div>

            {recipientType === "self" && (

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  Connected Wallet
                </p>

                <p className="mt-1 break-all font-medium text-[#1F4D36]">
                  {address}
                </p>

              </div>

            )}

            {recipientType === "other" && (

              <div className="space-y-3">

                <input
                  value={recipient}
                  onChange={(e) =>
                    setRecipient(e.target.value)
                  }
                  placeholder="0x..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    p-4
                    outline-none
                    transition
                    focus:border-[#1F4D36]
                  "
                />

                <p className="text-sm text-slate-500">
                  Treasury funds will be transferred to
                  this address if the proposal passes.
                </p>

              </div>

            )}

          </div>

          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (ETH)"
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              p-4
              outline-none
              transition
              focus:border-[#1F4D36]
            "
          />

          {insufficientTreasury && (

            <p className="text-sm text-red-600">

              Requested amount exceeds the
              available treasury.

            </p>

          )}

        </div>

        {/* Footer */}

        <div className="mt-10 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="
              rounded-full
              border
              border-slate-200
              px-6
              py-3
              font-semibold
              transition
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
              onClick={handleSubmit}
              disabled={insufficientTreasury}
              className={`
                rounded-full
                px-6
                py-3
                font-semibold
                text-white
                transition

                ${
                  insufficientTreasury
                    ? "cursor-not-allowed bg-slate-300"
                    : "bg-[#1F4D36] hover:bg-[#173C2B]"
                }
              `}
          >
              Submit Proposal
          </button>

        </div>

      </div>
    </div>
  );
}