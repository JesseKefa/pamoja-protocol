import Link from "next/link";

export default function QuickActions() {
  return (
    <section className="mb-24">

      <h2 className="mb-6 text-3xl font-black">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        <Link
          href="/create"
          className="
            rounded-xl
            bg-[#1F4D36]
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:scale-105
          "
        >
          Create Community
        </Link>

        <Link
          href="/communities"
          className="
            rounded-xl
            border
            bg-white
            px-8
            py-4
            font-semibold
            transition
            hover:bg-slate-100
          "
        >
          Browse Communities
        </Link>

      </div>

    </section>
  );
}