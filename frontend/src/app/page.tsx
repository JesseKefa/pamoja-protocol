"use client";

import { useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";

import { useWriteContract } from "wagmi";
import { parseEther } from "viem";

import PoolFactory from "@/contracts/PoolFactory.json";
import { POOL_FACTORY_ADDRESS } from "@/lib/contracts";

import { switchToHardhat } from "@/lib/switchToHardhat";
import { usePools } from "@/hooks/usePools";


export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contribution, setContribution] = useState("");

  const { writeContract } = useWriteContract();
  const { pools, isLoading, error } = usePools();

  const handleCreateCommunity = () => {
  if (!name || !description || !contribution) {
    alert("Please fill in all fields.");
    return;
  }

  console.log("Creating community...");

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
};

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">

  ...

  <button
    onClick={switchToHardhat}
    className="bg-black text-white rounded p-3"
  >
    Switch to Hardhat
  </button>

  {isLoading && <p>Loading communities...</p>}

  {error && <p>Something went wrong.</p>}

  <pre>
    {JSON.stringify(pools, null, 2)}
  </pre>

</main>

  );
}