"use client";

import Navbar from "@/components/Navbar";

import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CommunityList from "@/components/dashboard/CommunityList";
import DashboardActivity from "@/components/dashboard/DashboardActivity";

export default function DashboardPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">

        <DashboardHero />

        <DashboardStats />

        <CommunityList />

        <DashboardActivity />

      </main>
    </>
  );
}