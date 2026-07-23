export default function DashboardSummary() {
  const cards = [
    {
      title: "Communities",
      value: "--",
    },
    {
      title: "Total Saved",
      value: "-- ETH",
    },
    {
      title: "Pending Applications",
      value: "--",
    },
    {
      title: "Monthly Contributions",
      value: "-- ETH",
    },
  ];

  return (
    <section className="mb-14">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => (
          <div
            key={card.title}
            className="
              rounded-3xl
              border
              bg-white
              p-8
              shadow-sm
            "
          >
            <p className="text-sm text-slate-500">
              {card.title}
            </p>

            <h2 className="mt-3 text-3xl font-black">
              {card.value}
            </h2>
          </div>
        ))}

      </div>

    </section>
  );
}