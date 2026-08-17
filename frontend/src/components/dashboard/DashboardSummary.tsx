"use client";

import {
  Users,
  Wallet,
  Clock3,
  Repeat2,
} from "lucide-react";

import { useDashboardSummary } from "@/hooks/useDashboardSummary";

export default function DashboardSummary() {
  const summary = useDashboardSummary();

  const cards = [
    {
      title: "Communities",
      value: summary.communities,
      description: "Communities you're part of",
      icon: Users,
    },
    {
      title: "Total Saved",
      value: `${summary.totalSaved} ETH`,
      description: "Your total contributions",
      icon: Wallet,
    },
    {
      title: "Pending Applications",
      value: summary.pendingApplications,
      description: "Applications awaiting approval",
      icon: Clock3,
    },
    {
      title: "Monthly Contributions",
      value: `${summary.monthlyCommitment} ETH`,
      description: "Your expected monthly commitment",
      icon: Repeat2,
    },
  ];

  return (
    <section>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#EEF5F1]
                    text-[#1F4D36]
                  "
                >
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-6 text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                {card.value}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}