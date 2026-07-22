import { useReadContract } from "wagmi";
import Pool from "@/contracts/Pool.json";

export function usePendingApplicants(
  poolAddress?: `0x${string}`
) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: poolAddress,
    abi: Pool.abi,
    functionName: "getPendingApplicants",
    query: {
      enabled: !!poolAddress,
    },
  });

  return {
    applicants: (data as `0x${string}`[]) ?? [],
    isLoading,
    error,
    refetch,
  };
}