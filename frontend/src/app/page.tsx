"use client";

import { useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-5xl font-bold">
        Pamoja Protocol
      </h1>

      <ConnectWallet />

      <div className="flex flex-col gap-4 w-full max-w-md">

        <input
          placeholder="Community Name"
          className="border rounded p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border rounded p-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Monthly Contribution (ETH)"
          className="border rounded p-3"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white rounded p-3"
        >
          Create Community
        </button>

      </div>
    </main>
  );
}