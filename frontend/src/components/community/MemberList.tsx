"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

type Props = {
  members: `0x${string}`[];
  admin: `0x${string}`;
};

type MemberFilter = "All" | "Admin" | "Active";

function shorten(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function MemberRow({
  member,
  admin,
}: {
  member: `0x${string}`;
  admin: `0x${string}`;
}) {
  const isAdmin =
    member.toLowerCase() === admin.toLowerCase();

  return (
    <div className="flex items-center justify-between px-8 py-6">
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#EEF5F1]
            font-bold
            text-[#1F4D36]
          "
        >
          {member.slice(2, 4).toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-slate-900">
            {shorten(member)}
          </p>

          <p className="text-sm text-slate-500">
            Wallet Address
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isAdmin && (
          <span
            className="
              rounded-full
              bg-[#EEF5F1]
              px-3
              py-1
              text-sm
              font-semibold
              text-[#1F4D36]
            "
          >
            Admin
          </span>
        )}

        <span
          className="
            rounded-full
            bg-emerald-100
            px-3
            py-1
            text-sm
            font-medium
            text-emerald-700
          "
        >
          Active
        </span>
      </div>
    </div>
  );
}

export default function MemberList({
  members,
  admin,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  const [filter, setFilter] =
    useState<MemberFilter>("All");

  const recentMembers = members.slice(0, 5);

  const filteredMembers = useMemo(() => {
    if (filter === "All") {
      return members;
    }

    if (filter === "Admin") {
      return members.filter(
        (member) =>
          member.toLowerCase() ===
          admin.toLowerCase()
      );
    }

    return members;
  }, [members, admin, filter]);

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Members
          </h2>

          <p className="mt-2 text-slate-500">
            Everyone participating in this community.
          </p>
        </div>

        {members.length > 5 && (
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
            View all members
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        {recentMembers.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No members yet.
          </div>
        ) : (
          recentMembers.map((member, index) => (
            <div
              key={member}
              className={
                index !==
                recentMembers.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }
            >
              <MemberRow
                member={member}
                admin={admin}
              />
            </div>
          ))
        )}
      </div>

      {members.length > 5 && (
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
            View complete member list →
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
                  Members
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {members.length} member
                  {members.length === 1
                    ? ""
                    : "s"} in this community.
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
                  "Admin",
                  "Active",
                ] as MemberFilter[]
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
              {filteredMembers.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  No members match this filter.
                </div>
              ) : (
                filteredMembers.map(
                  (member, index) => (
                    <div
                      key={member}
                      className={
                        index !==
                        filteredMembers.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }
                    >
                      <MemberRow
                        member={member}
                        admin={admin}
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