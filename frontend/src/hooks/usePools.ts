import { useMemo } from "react";
import { useReadContract } from "wagmi";

import PoolFactory from "@/contracts/PoolFactory.json";
import { POOL_FACTORY_ADDRESS } from "@/lib/contracts";

export function usePools() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: POOL_FACTORY_ADDRESS,
    abi: PoolFactory.abi,
    functionName: "getAllPools",
  });

  const pools = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data;
  }, [data]);

  return {
    pools,
    isLoading,
    error,
    refetch,
  };
}