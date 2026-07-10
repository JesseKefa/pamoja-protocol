import Link from "next/link";
import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="bg-[#F7F5F2]">
      <Container>
        <div className="grid min-h-[85vh] items-center gap-16 py-20 lg:grid-cols-2">

          {/* Left Side */}
          <div>

            <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-[#C79A3B]">
              Building Wealth Together
            </p>

            <h1 className="text-6xl font-black leading-tight text-slate-900 lg:text-7xl">
              Community
              <br />
              Finance
              <br />
              Reimagined.
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">
              Pamoja Protocol empowers savings groups, investment clubs,
              cooperatives and communities with transparent,
              secure and decentralized financial infrastructure.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link href="/create">
                <Button>
                  Start a Community
                </Button>
              </Link>

              <Link href="/communities">
                <Button variant="secondary">
                  Explore Communities
                </Button>
              </Link>

            </div>

          </div>

          {/* Right Side */}
          <div className="flex justify-center">

            <div className="relative h-[500px] w-[500px]">

              <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1F4D36]" />

              <div className="absolute left-20 top-16 h-28 w-28 rounded-full bg-[#C79A3B]" />

              <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-slate-200" />

              <div className="absolute left-10 bottom-24 h-20 w-20 rounded-full bg-[#D9E7DF]" />

              <div className="absolute right-20 top-24 h-24 w-24 rounded-full bg-white shadow-lg" />

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}