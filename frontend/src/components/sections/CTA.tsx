import Link from "next/link";
import Container from "../ui/Container";

export default function CTA() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#081C15]
        py-40
        text-white
      "
    >

      {/* Glow */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[#C79A3B]/10
          blur-3xl
        "
      />


      <Container>

        <div
          className="
            relative
            mx-auto
            max-w-5xl
            text-center
          "
        >


          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#C79A3B]
            "
          >
            Pamoja Protocol
          </p>



          <h2
            className="
              mt-8
              text-5xl
              font-black
              leading-[0.95]
              tracking-tight
              lg:text-7xl
            "
          >
            Build the future
            <br />
            of community finance.
          </h2>



          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-xl
              leading-9
              text-white/70
            "
          >
            Empower your community with transparent,
            decentralized tools designed for collective
            growth and shared ownership.
          </p>



          <div
            className="
              mt-12
              flex
              justify-center
              gap-5
              flex-wrap
            "
          >

            <Link
              href="/create"
              className="
                rounded-xl
                bg-[#C79A3B]
                px-9
                py-4
                font-semibold
                text-[#081C15]
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
                border-white/40
                px-9
                py-4
                font-semibold
                transition
                hover:bg-white
                hover:text-[#081C15]
              "
            >
              Explore Communities
            </Link>


          </div>


        </div>


      </Container>


    </section>
  );
}