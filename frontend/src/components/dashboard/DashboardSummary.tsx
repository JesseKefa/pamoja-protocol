"use client";

import { useDashboardSummary } from "@/hooks/useDashboardSummary";

export default function DashboardSummary() {
  const summary = useDashboardSummary();

  const cards = [
    {
      title: "Communities",
      value: summary.communities,
    },
    {
      title: "Total Saved",
      value: `${summary.totalSaved} ETH`,
    },
    {
      title: "Pending Applications",
      value: summary.pendingApplications,
    },
    {
      title: "Monthly Contributions",
      value: `${summary.monthlyCommitment} ETH`,
    },
  ];

  return (
    <section className="mb-14">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              rounded-3xl
              border
              bg-white
              p-8
              shadow-sm
            "
          >
            <p className="text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-3 text-3xl font-black">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}