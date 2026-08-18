import Link from "next/link";
import Container from "../ui/Container";

export default function CTA() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#061F17]
        py-32
        text-white
      "
    >

      {/* Continuation of Impact glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-320px]
          h-[700px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-[#C79A3B]/10
          blur-[150px]
        "
      />

      {/* Soft central light */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[35%]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#1F4D36]/30
          blur-[150px]
        "
      />

      <Container>

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-4xl
            text-center
          "
        >

          <p
            className="
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#C79A3B]
            "
          >
            PAMOJA PROTOCOL
          </p>


          <h2
            className="
              mt-6
              text-5xl
              font-black
              leading-[0.95]
              tracking-tight
              text-white
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
              text-lg
              leading-8
              text-slate-300
              lg:text-xl
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
              flex-wrap
              justify-center
              gap-4
            "
          >

            <Link
              href="/create"
              className="
                rounded-full
                bg-[#C79A3B]
                px-8
                py-4
                font-semibold
                text-[#061F17]
                shadow-[0_10px_40px_rgba(199,154,59,0.20)]
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-[#D6AC4F]
                hover:shadow-[0_15px_50px_rgba(199,154,59,0.30)]
              "
            >
              Create Community
            </Link>


            <Link
              href="/communities"
              className="
                rounded-full
                border
                border-white/20
                bg-white/5
                px-8
                py-4
                font-semibold
                text-white
                backdrop-blur
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-white/10
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