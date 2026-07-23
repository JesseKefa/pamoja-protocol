"use client";

import Navbar from "@/components/Navbar";

import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import MyCommunities from "@/components/dashboard/MyCommunities";
import PendingApplications from "@/components/dashboard/PendingApplications";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">

        <DashboardHero />

        <DashboardSummary />

        <MyCommunities />

        <PendingApplications />

        <QuickActions />

      </main>
    </>
  );
}