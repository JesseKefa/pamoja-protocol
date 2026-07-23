"use client";

import Navbar from "@/components/Navbar";

import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import MyCommunities from "@/components/dashboard/MyCommunities";
import PendingApplications from "@/components/dashboard/PendingApplications";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { usePendingCommunities } from "@/hooks/usePendingCommunities";


export default function DashboardPage() {
  const { applications } = usePendingCommunities();

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-16">

        <DashboardHero />

        <DashboardSummary />

        <MyCommunities />

        <QuickActions />

        <PendingApplications
          applications={applications}
        />

        <RecentActivity />

      </main>
    </>
  );
}