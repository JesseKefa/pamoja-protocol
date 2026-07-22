"use client";

import Link from "next/link";

export default function CommunityList() {
  const communities = [
    {
      id: 1,
      name: "Asili",
      treasury: "2 ETH",
      members: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Ubuntu Savings",
      treasury: "4 ETH",
      members: 8,
      status: "Active",
    },
  ];

  return (
    <section className="mb-16">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black">
          Your Communities
        </h2>

        <Link
          href="/communities"
          className="font-semibold text-[#1F4D36] hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="space-y-6">

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

                <p className="mt-2 text-slate-500">
                  {community.status}
                </p>

              </div>

              <Link
                href={`/communities/${community.id}`}
                className="
                  rounded-xl
                  bg-[#1F4D36]
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Open →
              </Link>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-8">

              <div>

                <p className="text-sm text-slate-500">
                  Treasury
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {community.treasury}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Members
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {community.members}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}