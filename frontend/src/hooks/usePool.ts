import { useReadContract } from "wagmi";

import PoolFactory from "@/contracts/PoolFactory.json";
import { POOL_FACTORY_ADDRESS } from "@/lib/contracts";

export function usePool(id: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: POOL_FACTORY_ADDRESS,
    abi: PoolFactory.abi,
    functionName: "getPool",
    args: [BigInt(id)],
  });

  return {
    pool: data,
    isLoading,
    error,
    refetch,
  };
}