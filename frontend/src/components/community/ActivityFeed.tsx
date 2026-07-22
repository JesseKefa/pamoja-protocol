type Activity = {
  title: string;
  subtitle: string;
};

type Props = {
  activities?: Activity[];
};

export default function ActivityFeed({
  activities = [],
}: Props) {
  return (
    <section className="mt-20 mb-24">

      <h2 className="text-3xl font-bold">
        Recent Activity
      </h2>

      <div className="mt-8 rounded-3xl border bg-white p-8">

        {activities.length === 0 ? (
          <p className="text-slate-500">
            No activity yet.
          </p>
        ) : (
          <div className="space-y-5">

            {activities.map((activity, index) => (
              <div
                key={index}
                className="
                  flex
                  items-start
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >
                <div>

                  <h3 className="font-semibold">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.subtitle}
                  </p>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}