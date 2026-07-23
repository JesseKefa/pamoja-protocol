import Link from "next/link";
import { formatEther } from "viem";

import { useMyCommunities } from "@/hooks/useMyCommunities";

export default function MyCommunities() {
  const { communities } = useMyCommunities();

  return (
    <section className="mb-14">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-black">
          My Communities
        </h2>

        <Link
          href="/communities"
          className="
            font-semibold
            text-[#1F4D36]
            hover:underline
          "
        >
          Browse Communities
        </Link>

      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        {communities.length === 0 ? (

          <div className="p-12 text-center">

            <h3 className="text-xl font-semibold">
              You're not part of any communities yet
            </h3>

            <p className="mt-3 text-slate-500">
              Join an existing community or create one to begin saving.
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
                hover:scale-105
              "
            >
              Explore Communities
            </Link>

          </div>

        ) : (

          communities.map((community) => (

            <div
              key={community.id}
              className="
                flex
                items-center
                justify-between
                border-b
                px-8
                py-6
                last:border-b-0
              "
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {community.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {community.members} members
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  {formatEther(community.treasury)} ETH
                </p>

                <Link
                  href={`/communities/${community.id}`}
                  className="
                    mt-2
                    inline-block
                    text-sm
                    font-semibold
                    text-[#1F4D36]
                  "
                >
                  Open Community
                </Link>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}