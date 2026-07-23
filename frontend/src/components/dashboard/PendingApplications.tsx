"use client";

import Link from "next/link";

type Application = {
  id: number;
  name: string;
};

type Props = {
  applications: Application[];
};

export default function PendingApplications({
  applications,
}: Props) {
  return (
    <section className="mt-16">

      <div className="mb-8">
        <h2 className="text-3xl font-black">
          Pending Applications
        </h2>

        <p className="mt-2 text-slate-500">
          Communities awaiting approval.
        </p>
      </div>

      {applications.length === 0 ? (

        <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">

          <h3 className="text-xl font-bold">
            No pending applications
          </h3>

          <p className="mt-3 text-slate-500">
            You're already a member of every community you've applied to.
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

          {applications.map((application) => (

            <div
              key={application.id}
              className="
                rounded-3xl
                border
                bg-white
                p-8
                shadow-sm
              "
            >

              <h3 className="text-2xl font-bold">
                {application.name}
              </h3>

              <div className="mt-8">

                <p className="text-sm text-slate-500">
                  Status
                </p>

                <span
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    bg-amber-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-amber-700
                  "
                >
                  Pending Approval
                </span>

              </div>

              <p className="mt-8 text-sm text-slate-500">
                Waiting for the community administrator to review your request.
              </p>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}