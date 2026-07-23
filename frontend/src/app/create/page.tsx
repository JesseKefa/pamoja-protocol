"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { toast } from "sonner";

import PoolFactory from "@/contracts/PoolFactory.json";
import { POOL_FACTORY_ADDRESS } from "@/lib/contracts";

export default function CreateCommunityPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState("");

  const [creating, setCreating] = useState(false);

  const { writeContract } = useWriteContract({
    mutation: {
      onMutate() {
        setCreating(true);

        toast.loading("Waiting for wallet confirmation...", {
          id: "create-community",
        });
      },

      onSuccess() {
        toast.success("Community created successfully!", {
          id: "create-community",
          description:
            "Your community is now live and ready for members.",
        });

        setName("");
        setDescription("");
        setContribution("");

        setTimeout(() => {
          router.push("/communities");
        }, 1200);
      },

      onError(error) {
        console.error(error);

        toast.error("Failed to create community.", {
          id: "create-community",
          description:
            "Please try again or check your wallet.",
        });

        setCreating(false);
      },

      onSettled() {
        setCreating(false);
      },
    },
  });

  function handleCreateCommunity() {
    if (!name || !description || !contribution) {
      toast.error("Please complete all fields.");
      return;
    }

    writeContract({
      address: POOL_FACTORY_ADDRESS,
      abi: PoolFactory.abi,
      functionName: "createPool",
      args: [
        name,
        description,
        parseEther(contribution),
      ],
    });
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">

        <h1 className="mb-2 text-4xl font-black">
          Create Community
        </h1>

        <p className="mb-8 text-slate-600">
          Start a new savings group on Pamoja Protocol.
        </p>

        <div className="flex flex-col gap-6 rounded-3xl border bg-white p-8 shadow-sm">

          <div>
            <label className="mb-2 block font-semibold">
              Community Name
            </label>

            <input
              className="w-full rounded-xl border p-4 outline-none transition focus:border-[#1F4D36]"
              placeholder="Friends Chama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              className="w-full rounded-xl border p-4 outline-none transition focus:border-[#1F4D36]"
              placeholder="Describe your community..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Monthly Contribution (ETH)
            </label>

            <input
              className="w-full rounded-xl border p-4 outline-none transition focus:border-[#1F4D36]"
              placeholder="0.01"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
            />
          </div>

          <button
            disabled={creating}
            onClick={handleCreateCommunity}
            className="
              mt-2
              rounded-2xl
              bg-[#1F4D36]
              p-4
              font-semibold
              text-white
              transition-all
              hover:bg-[#285F43]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {creating
              ? "Creating Community..."
              : "Create Community"}
          </button>

        </div>

      </main>
    </>
  );
}