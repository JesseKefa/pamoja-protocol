"use client";

import FadeIn from "@/components/animations/FadeIn";

import Container from "../ui/Container";
import Button from "../ui/Button";

import HeroBackground from "./HeroBackground";
import HeroIllustration from "./HeroIllustration";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section
      className="
        relative
        flex
        h-screen
        min-h-[700px]
        items-center
        overflow-hidden
      "
    >
      <HeroBackground />

      <Container>
        <div
          className="
            relative
            z-10
            grid
            w-full
            items-center
            gap-12
            lg:grid-cols-2
            lg:gap-24
          "
        >
          {/* LEFT */}

          <FadeIn>
            <div className="max-w-2xl">
              <div
                className="
                  inline-flex
                  rounded-full
                  border
                  border-[#DCCFB7]
                  bg-[#FFF9EE]
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  tracking-wide
                  text-[#B8860B]
                "
              >
                Built for African Communities
              </div>

              <h1
                className="
                  mt-8
                  text-5xl
                  font-black
                  leading-[0.9]
                  tracking-tight
                  text-[#1F2937]
                  lg:text-7xl
                "
              >
                Save Together.
                <br />
                Grow Together.
                <br />
                <span className="text-[#1F4D36]">
                  Rise Together.
                </span>
              </h1>

              <p
                className="
                  mt-8
                  max-w-xl
                  text-lg
                  leading-8
                  text-slate-600
                  lg:text-xl
                "
              >
                From neighborhood chamas to investment clubs and
                cooperatives, Pamoja helps communities save,
                govern and grow together through transparent
                on-chain finance.
              </p>

              <HeroStats />

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/create">
                  Create Your Chama
                </Button>

                <Button
                  href="/communities"
                  variant="secondary"
                >
                  Explore Communities
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-slate-500">
                <div>✓ Self Custodied</div>
                <div>✓ Transparent</div>
                <div>✓ Community Governed</div>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT */}

          <FadeIn>
            <HeroIllustration />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}