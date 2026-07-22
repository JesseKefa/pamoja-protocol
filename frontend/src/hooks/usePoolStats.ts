import { useReadContracts } from "wagmi";
import Pool from "@/contracts/Pool.json";

export function usePoolStats(address: `0x${string}`) {
  const { data, isLoading, error } = useReadContracts({
    contracts: [
      {
        address,
        abi: Pool.abi,
        functionName: "memberCount",
      },
      {
        address,
        abi: Pool.abi,
        functionName: "totalContributions",
      },
    ],
  });

  return {
    memberCount: data?.[0]?.result,
    totalContributions: data?.[1]?.result,
    isLoading,
    error,
  };
}