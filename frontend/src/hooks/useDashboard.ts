import { useMemo } from "react";
import { usePools } from "./usePools";

export function useDashboard() {
  const {
    pools,
    isLoading,
    error,
  } = usePools();

    const stats = useMemo(() => {

        const totalCommunities = pools.length;

        const totalSaved = pools.reduce(
            (sum: number, pool: any) =>
                sum +
                Number(pool.totalContributions ?? 0),
            0
        );

        return {
            totalCommunities,
            totalSaved,
            pendingRequests: 0,
            monthlyContribution: 0,
        };

    }, [pools]);

    return {
        pools,
        stats,
        isLoading,
        error,
    };
}