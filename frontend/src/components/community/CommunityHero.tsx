import type { ReactNode } from "react";

type Props = {
  pool: any;
};

export default function CommunityHero({ pool }: Props) {
  return (
    <section className="mb-14">

      <span
        className="
          rounded-full
          bg-emerald-100
          px-4
          py-2
          text-sm
          font-semibold
          text-emerald-700
        "
      >
        Active Community
      </span>

      <h1 className="mt-6 text-5xl font-black">
        {pool.name}
      </h1>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        {pool.description}
      </p>

    </section>
  );
}