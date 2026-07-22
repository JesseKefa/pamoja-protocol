"use client";

import FadeIn from "@/components/animations/FadeIn";

import Container from "../ui/Container";
import Button from "../ui/Button";

import HeroBackground from "./HeroBackground";
import HeroIllustration from "./HeroIllustration";
import HeroTrustBar from "./HeroTrustBar";

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
                Community Finance for Africa
              </div>


              <h1
                className="
                  mt-6
                  text-5xl
                  font-black
                  leading-[0.95]
                  tracking-tight
                  text-[#1F2937]
                  lg:text-7xl
                "
              >
                Communities
                <br />
                Build Wealth.
                <br />
                Together.
              </h1>


              <p
                className="
                  mt-6
                  max-w-xl
                  text-lg
                  leading-8
                  text-slate-600
                  lg:text-xl
                "
              >
                Pamoja empowers savings groups,
                cooperatives and investment clubs with
                transparent, secure and decentralized
                financial infrastructure designed for Africa.
              </p>


              <div className="mt-8 flex flex-wrap gap-5">

                <Button href="/create">
                  Start a Community
                </Button>

                <Button
                  href="/communities"
                  variant="secondary"
                >
                  Explore Communities
                </Button>

              </div>


              <HeroTrustBar />

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