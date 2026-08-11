"use client";

import Link from "next/link";
import { Users, Wallet } from "lucide-react";
import { formatEther } from "viem";

import { useMyCommunities } from "@/hooks/useMyCommunities";

export default function MyCommunities() {
  const { communities } = useMyCommunities();

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            My Communities
          </h2>

          <p className="mt-2 text-slate-500">
            Communities you currently belong to.
          </p>
        </div>

        {communities.length > 0 && (
          <Link
            href="/communities"
            className="
              hidden
              text-sm
              font-semibold
              text-[#1F4D36]
              transition
              hover:underline
              sm:block
            "
          >
            Explore communities →
          </Link>
        )}
      </div>

      {communities.length === 0 ? (
        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-12
            text-center
            shadow-sm
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#EEF5F1]
              text-[#1F4D36]
            "
          >
            <Users size={24} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No communities yet
          </h3>

          <p className="mx-auto mt-3 max-w-md text-slate-500">
            Join an existing community or create your own
            savings group to get started.
          </p>

          <Link
            href="/communities"
            className="
              mt-8
              inline-flex
              rounded-xl
              bg-[#1F4D36]
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#173C2B]
            "
          >
            Browse Communities
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {communities.map((community) => (
            <div
              key={community.id}
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-7
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {community.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Community #{community.id}
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-emerald-700
                  "
                >
                  Active
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-5
                  "
                >
                  <div className="flex items-center gap-2 text-slate-500">
                    <Wallet size={16} />

                    <p className="text-sm">
                      Your Savings
                    </p>
                  </div>

                  <p className="mt-2 text-xl font-black text-[#1F4D36]">
                    {formatEther(
                      community.contribution
                    )}{" "}
                    ETH
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-5
                  "
                >
                  <div className="flex items-center gap-2 text-slate-500">
                    <Users size={16} />

                    <p className="text-sm">
                      Members
                    </p>
                  </div>

                  <p className="mt-2 text-xl font-black text-slate-900">
                    {community.members}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm text-slate-500">
                  Community Treasury
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatEther(
                    community.treasury
                  )}{" "}
                  ETH
                </p>
              </div>

              <Link
                href={`/communities/${community.id}`}
                className="
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  py-3
                  font-semibold
                  text-slate-700
                  transition
                  hover:border-[#1F4D36]
                  hover:bg-[#EEF5F1]
                  hover:text-[#1F4D36]
                "
              >
                Open Community →
              </Link>
            </div>
          ))}
        </div>
      )}

      {communities.length > 0 && (
        <div className="mt-5 sm:hidden">
          <Link
            href="/communities"
            className="
              text-sm
              font-semibold
              text-[#1F4D36]
              hover:underline
            "
          >
            Explore communities →
          </Link>
        </div>
      )}
    </section>
  );
}