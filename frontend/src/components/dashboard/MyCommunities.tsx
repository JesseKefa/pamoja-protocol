"use client";

import Link from "next/link";
import { formatEther } from "viem";

import { useMyCommunities } from "@/hooks/useMyCommunities";

export default function MyCommunities() {
  const { communities } = useMyCommunities();

  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-black">
            My Communities
          </h2>

          <p className="mt-2 text-slate-500">
            Communities you belong to.
          </p>
        </div>

      </div>

      {communities.length === 0 ? (

        <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">

          <h3 className="text-xl font-bold">
            No communities yet
          </h3>

          <p className="mt-3 text-slate-500">
            Join an existing community or create your own.
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
              hover:opacity-90
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
                bg-white
                p-8
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="text-2xl font-bold">
                    {community.name}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Community #{community.id}
                  </p>

                </div>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">

                <div>

                  <p className="text-sm text-slate-500">
                    Treasury
                  </p>

                  <p className="mt-2 text-2xl font-black text-[#1F4D36]">
                    {formatEther(community.treasury)} ETH
                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Members
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    {community.members}
                  </p>

                </div>

              </div>

              <Link
                href={`/communities/${community.id}`}
                className="
                  mt-10
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  py-3
                  font-semibold
                  transition
                  hover:bg-[#F8F5F0]
                "
              >
                Open Community →
              </Link>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}