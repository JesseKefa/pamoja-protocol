type Props = {
  members: `0x${string}`[];
  admin: `0x${string}`;
};

export default function MemberList({
  members,
  admin,
}: Props) {
  return (
    <section className="mt-20">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#1F2937]">
          Members
        </h2>

        <p className="mt-2 text-slate-500">
          Everyone participating in this community.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        {members.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No members yet.
          </div>
        ) : (
          members.map((member, index) => (
            <div
              key={member}
              className={`
                flex
                items-center
                justify-between
                px-8
                py-6
                ${
                  index !== members.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
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
                    {member.slice(0, 6)}...
                    {member.slice(-4)}
                  </p>

                  <p className="text-sm text-slate-500">
                    Wallet Address
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {member.toLowerCase() ===
                  admin.toLowerCase() && (
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
          ))
        )}
      </div>
    </section>
  );
}