type Props = {
  members?: string[];
};

export default function MemberList({
  members = [],
}: Props) {
  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold">
        Members
      </h2>

      <div className="mt-8 rounded-3xl border bg-white p-8">

        {members.length === 0 ? (
          <p className="text-slate-500">
            Member list coming soon...
          </p>
        ) : (
          <div className="space-y-4">

            {members.map((member) => (
              <div
                key={member}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >
                <span className="font-medium">
                  {member.slice(0, 6)}...
                  {member.slice(-4)}
                </span>

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
            ))}

          </div>
        )}

      </div>

    </section>
  );
}