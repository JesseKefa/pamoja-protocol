"use client";

import FadeIn from "@/components/animations/FadeIn";

import Container from "../ui/Container";
import Button from "../ui/Button";

import HeroBackground from "./HeroBackground";
import HeroIllustration from "./HeroIllustration";


export default function Hero() {
  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-visible
      "
    >

      <HeroBackground />


      <Container>

        <div
          className="
            relative
            z-10
            grid
            items-center
            gap-16
            py-24
            lg:grid-cols-2
            lg:gap-10
          "
        >


          {/* LEFT */}

          <FadeIn delay={0.1}>

            <div
              className="
                max-w-xl
              "
            >


              {/* EYEBROW */}

              <div
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-[#DCCFB7]
                  bg-white/60
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  tracking-wide
                  text-[#B8860B]
                  backdrop-blur
                "
              >
                Community Finance for Africa
              </div>




              <h1
                className="
                  mt-8
                  text-5xl
                  font-black
                  leading-[0.92]
                  tracking-[-0.04em]
                  text-[#1F2937]
                  sm:text-6xl
                  lg:text-[76px]
                "
              >

                Save Together.

                <br />

                Grow Together.

                <br />


                <span
                  className="
                    text-[#1F4D36]
                  "
                >
                  Rise Together.
                </span>


              </h1>





              <p
                className="
                  mt-8
                  max-w-lg
                  text-lg
                  leading-8
                  text-slate-600
                "
              >

                A decentralized protocol helping
                communities save, govern and build
                wealth together.

              </p>





              <div
                className="
                  mt-10
                  flex
                  flex-wrap
                  gap-4
                "
              >

                <Button href="/create">
                  Create Community
                </Button>


                <Button
                  href="/communities"
                  variant="secondary"
                >
                  Explore Communities
                </Button>


              </div>



              



            </div>


          </FadeIn>





          {/* RIGHT */}

          <FadeIn delay={0.25}>

            <div
              className="
                relative
                scale-90
                lg:scale-100
              "
            >

              <HeroIllustration />

            </div>


          </FadeIn>



        </div>


      </Container>



      {/* SECTION TRANSITION */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-40
          w-full
          bg-gradient-to-b
          from-transparent
          to-white
        "
      />


    </section>
  );
}