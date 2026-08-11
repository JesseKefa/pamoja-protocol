import { useReadContract } from "wagmi";

import PoolFactory from "@/contracts/PoolFactory.json";
import { POOL_FACTORY_ADDRESS } from "@/lib/contracts";

type Pool = {
  id: bigint;
  name: string;
  description: string;
  creator: `0x${string}`;
  poolAddress: `0x${string}`;
  createdAt: bigint;
  isActive: boolean;
  contributionAmount: bigint;
};

export function usePool(id: number) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: POOL_FACTORY_ADDRESS,
    abi: PoolFactory.abi,
    functionName: "getPoolById",
    args: [BigInt(id)],
  });

  const pool = data as Pool | undefined;

  return {
    pool,
    isLoading,
    error,
    refetch,
  };
}