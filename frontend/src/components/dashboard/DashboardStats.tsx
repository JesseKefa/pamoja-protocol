export default function DashboardStats() {
  const stats = [
    {
      title: "Communities",
      value: "2",
    },
    {
      title: "Pending Requests",
      value: "1",
    },
    {
      title: "Total Saved",
      value: "2 ETH",
    },
    {
      title: "This Month",
      value: "1 ETH",
    },
  ];

  return (
    <section className="mb-16">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="
              rounded-3xl
              border
              bg-white
              p-8
              shadow-sm
            "
          >
            <p className="text-sm text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#1F4D36]">
              {stat.value}
            </h2>

          </div>
        ))}

      </div>

    </section>
  );
}