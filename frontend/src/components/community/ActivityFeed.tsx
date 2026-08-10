"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

type Activity = {
  action: string;
  user: `0x${string}`;
  amount: bigint;
  timestamp: bigint;
};

type Props = {
  activities: Activity[];
};

type ActivityFilter =
  | "All"
  | "Contribution"
  | "Member Approved"
  | "Join Request"
  | "Treasury Withdrawal";

function shorten(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatAction(action: string) {
  switch (action) {
    case "Join Request":
      return "requested to join the community";

    case "Member Approved":
      return "was approved as a member";

    case "Contribution":
      return "made a contribution";

    case "Treasury Withdrawal":
      return "received a treasury withdrawal";

    default:
      return action;
  }
}

function formatAmount(amount: bigint) {
  if (amount === 0n) {
    return null;
  }

  return `${(Number(amount) / 1e18).toFixed(4)} ETH`;
}

function formatDate(timestamp: bigint) {
  return new Date(
    Number(timestamp) * 1000
  ).toLocaleString();
}

function ActivityItem({
  activity,
}: {
  activity: Activity;
}) {
  const amount = formatAmount(activity.amount);

  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#EEF5F1]
            text-sm
            font-bold
            text-[#1F4D36]
          "
        >
          {activity.user.slice(2, 4).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate text-slate-700">
            <span className="font-semibold text-[#1F4D36]">
              {shorten(activity.user)}
            </span>{" "}
            {formatAction(activity.action)}
          </p>

          {amount && (
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {amount}
            </p>
          )}
        </div>
      </div>

      {/* Right side — date/time */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-medium text-slate-700">
          {new Date(
            Number(activity.timestamp) * 1000
          ).toLocaleDateString()}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {new Date(
            Number(activity.timestamp) * 1000
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}


export default function ActivityFeed({
  activities,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  const [filter, setFilter] =
    useState<ActivityFilter>("All");

  const sortedActivities = useMemo(() => {
    return [...activities].sort(
      (a, b) =>
        Number(b.timestamp) -
        Number(a.timestamp)
    );
  }, [activities]);

  const filteredActivities = useMemo(() => {
    if (filter === "All") {
      return sortedActivities;
    }

    return sortedActivities.filter(
      (activity) => activity.action === filter
    );
  }, [sortedActivities, filter]);

  const recentActivities =
    sortedActivities.slice(0, 5);

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Activity
          </h2>

          <p className="mt-2 text-slate-500">
            Recent activity within this community.
          </p>
        </div>

        {activities.length > 5 && (
          <button
            onClick={() => setShowAll(true)}
            className="
              rounded-full
              border
              border-slate-200
              px-4
              py-2
              text-sm
              font-semibold
              text-[#1F4D36]
              transition
              hover:bg-[#EEF5F1]
            "
          >
            View all activity
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        {recentActivities.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No activity yet.
          </div>
        ) : (
          recentActivities.map(
            (activity, index) => (
              <div
                key={`${activity.timestamp.toString()}-${index}`}
                className={
                  index !==
                  recentActivities.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }
              >
                <ActivityItem
                  activity={activity}
                />
              </div>
            )
          )
        )}
      </div>

      {activities.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="
              text-sm
              font-semibold
              text-slate-500
              transition
              hover:text-[#1F4D36]
            "
          >
            View complete activity history →
          </button>
        </div>
      )}

      {showAll && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            justify-end
            bg-black/40
            backdrop-blur-sm
          "
          onClick={() => setShowAll(false)}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              h-full
              w-full
              max-w-xl
              overflow-y-auto
              bg-white
              p-8
              shadow-2xl
            "
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  Activity History
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Complete community activity.
                </p>
              </div>

              <button
                onClick={() => setShowAll(false)}
                className="
                  rounded-full
                  p-2
                  transition
                  hover:bg-slate-100
                "
              >
                <X />
              </button>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {(
                [
                  "All",
                  "Contribution",
                  "Member Approved",
                  "Join Request",
                  "Treasury Withdrawal",
                ] as ActivityFilter[]
              ).map((option) => (
                <button
                  key={option}
                  onClick={() =>
                    setFilter(option)
                  }
                  className={`
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition
                    ${
                      filter === option
                        ? "bg-[#1F4D36] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white">
              {filteredActivities.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  No activity matches this filter.
                </div>
              ) : (
                filteredActivities.map(
                  (activity, index) => (
                    <div
                      key={`${activity.timestamp.toString()}-${index}`}
                      className={
                        index !==
                        filteredActivities.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }
                    >
                      <ActivityItem
                        activity={activity}
                      />
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}