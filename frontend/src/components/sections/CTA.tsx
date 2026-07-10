import Link from "next/link";
import Container from "../ui/Container";

export default function CTA() {
  return (
    <section className="bg-[#1F4D36] py-28 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">

          <p className="font-semibold uppercase tracking-[0.2em] text-[#C79A3B]">
            GET STARTED
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Your community deserves
            better financial tools.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-200">
            Build transparent savings groups,
            investment clubs and cooperatives
            powered by blockchain technology.
          </p>

          <div className="mt-12 flex justify-center gap-5">

            <Link
              href="/create"
              className="rounded-xl bg-[#C79A3B] px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
            >
              Create Community
            </Link>

            <Link
              href="/communities"
              className="rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-[#1F4D36]"
            >
              Browse Communities
            </Link>

          </div>

        </div>
      </Container>
    </section>
  );
}