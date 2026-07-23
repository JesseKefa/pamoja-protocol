import { useMemo } from "react";
import { useMyCommunities } from "./useMyCommunities";

export function useDashboardStats() {
  const { communities } = useMyCommunities();

  const stats = useMemo(() => {
    const totalCommunities = communities.length;

    const totalTreasury = communities.reduce(
      (sum, community) => sum + community.treasury,
      BigInt(0)
    );

    return {
      totalCommunities,
      totalTreasury,
      pendingApplications: 0,
    };
  }, [communities]);

  return stats;
}