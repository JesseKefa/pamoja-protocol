type Props = {
  isAdmin: boolean;
  applicants?: `0x${string}`[];
  onApprove: (applicant: `0x${string}`) => void;
};

export default function PendingRequests({
  isAdmin,
  applicants = [],
  onApprove,
}: Props) {
  if (!isAdmin) return null;

  return (
    <section className="mt-20">

      <h2 className="text-3xl font-bold">
        Pending Requests
      </h2>

      <div className="mt-8 rounded-3xl border bg-white p-8">

        {applicants.length === 0 ? (
          <p className="text-slate-500">
            No pending requests.
          </p>
        ) : (
          <div className="space-y-4">

            {applicants.map((applicant) => (
              <div
                key={applicant}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >

                <div>

                  <p className="font-semibold">
                    {applicant.slice(0, 6)}...
                    {applicant.slice(-4)}
                  </p>

                  <p className="text-sm text-slate-500">
                    Awaiting approval
                  </p>

                </div>

                <button
                  onClick={() => onApprove(applicant)}
                  className="
                    rounded-lg
                    bg-[#1F4D36]
                    px-5
                    py-2
                    font-medium
                    text-white
                    transition
                    hover:opacity-90
                  "
                >
                  Approve
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}