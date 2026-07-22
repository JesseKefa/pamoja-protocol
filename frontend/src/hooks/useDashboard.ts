import { usePools } from "./usePools";

export function useDashboard() {
  const { pools, isLoading } = usePools();

  return {
    communities: pools ?? [],
    isLoading,
  };
}