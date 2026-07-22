export default function DashboardActivity() {
  const activities = [
    {
      title: "Joined Asili",
      time: "Today",
    },
    {
      title: "Contributed 1 ETH",
      time: "Yesterday",
    },
    {
      title: "Approved a new member",
      time: "2 days ago",
    },
  ];

  return (
    <section className="mb-20">

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Recent Activity
        </h2>

        <p className="mt-2 text-slate-500">
          Keep track of everything happening across your communities.
        </p>

      </div>

      <div className="rounded-3xl border bg-white shadow-sm">

        {activities.map((activity, index) => (
          <div
            key={index}
            className={`
              flex
              items-center
              justify-between
              p-6
              ${
                index !== activities.length - 1
                  ? "border-b"
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
                  bg-[#F3F4F6]
                  text-xl
                "
              >
                ✓
              </div>

              <div>

                <p className="font-semibold">
                  {activity.title}
                </p>

                <p className="text-sm text-slate-500">
                  {activity.time}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}