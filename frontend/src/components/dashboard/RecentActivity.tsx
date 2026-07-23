"use client";

import { formatEther } from "viem";

import { useUserActivity } from "@/hooks/useUserActivity";

export default function RecentActivity() {
  const { activities } = useUserActivity();

  return (
    <section className="mb-20">

      <div className="mb-8">
        <h2 className="text-3xl font-black">
          Recent Activity
        </h2>

        <p className="mt-2 text-slate-500">
          Your activity across all communities.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        {activities.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No activity yet.
          </div>
        ) : (
          activities.map((activity, index) => (
            <div
              key={index}
              className={`
                flex
                items-center
                justify-between
                px-8
                py-6
                ${
                  index !== activities.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }
              `}
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF5F1] font-bold text-[#1F4D36]">
                  {activity.type.charAt(0)}
                </div>

                <div>

                  <p className="font-semibold">
                    {activity.type}
                  </p>

                  <p className="text-sm text-slate-500">
                    {activity.community}
                  </p>

                </div>

              </div>

              {activity.amount && (
                <div className="text-right">

                  <p className="font-semibold text-[#1F4D36]">
                    {formatEther(activity.amount)} ETH
                  </p>

                  <p className="text-sm text-slate-500">
                    Contribution
                  </p>

                </div>
              )}

            </div>
          ))
        )}

      </div>

    </section>
  );
}