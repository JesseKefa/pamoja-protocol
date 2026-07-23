type PendingCommunity = {
  id: number;
  name: string;
};

export default function PendingApplications() {
  const pending: PendingCommunity[] = [];

  if (pending.length === 0) {
    return null;
  }

  return (
    <section className="mb-14">

      <h2 className="mb-6 text-3xl font-black">
        Pending Applications
      </h2>

      <div className="rounded-3xl border bg-white shadow-sm">

        {pending.map((community) => (

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

              <h3 className="font-semibold">
                {community.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Awaiting approval from the community administrator.
              </p>

            </div>

            <span
              className="
                rounded-full
                bg-[#F8F5F0]
                px-4
                py-2
                text-sm
                font-semibold
                text-[#8B5E3C]
              "
            >
              Pending
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}