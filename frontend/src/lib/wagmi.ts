import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { localhost, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Pamoja Protocol",
  projectId: "a8d64e2650a18aecdf97829460609f5b",
  chains: [localhost, sepolia],
});