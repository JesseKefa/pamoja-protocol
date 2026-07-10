"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";

import { useWriteContract } from "wagmi";
import { parseEther } from "viem";

import PoolFactory from "@/contracts/PoolFactory.json";
import { POOL_FACTORY_ADDRESS } from "@/lib/contracts";

export default function CreateCommunityPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState("");

  const { writeContract } = useWriteContract();

  const handleCreateCommunity = () => {
    if (!name || !description || !contribution) {
      alert("Please fill in all fields.");
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

    // Clear the form after submitting
    setName("");
    setDescription("");
    setContribution("");
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
        <h1 className="mb-2 text-4xl font-bold">
          Create Community
        </h1>

        <p className="mb-8 text-gray-600">
          Start a new savings group on Pamoja Protocol.
        </p>

        <div className="flex flex-col gap-5 rounded-xl border bg-white p-8 shadow-sm">

          <div>
            <label className="mb-2 block font-medium">
              Community Name
            </label>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="Friends Chama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              className="w-full rounded-lg border p-3"
              rows={4}
              placeholder="Describe your community..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Monthly Contribution (ETH)
            </label>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="0.01"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
            />
          </div>

          <button
            onClick={handleCreateCommunity}
            className="rounded-lg bg-emerald-600 p-4 font-semibold text-white transition hover:bg-emerald-700"
          >
            Create Community
          </button>

        </div>
      </main>
    </>
  );
}