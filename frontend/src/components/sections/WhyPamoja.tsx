import Container from "../ui/Container";
import { ShieldCheck, Users, Landmark } from "lucide-react";

export default function WhyPamoja() {
  const principles = [
    {
      icon: ShieldCheck,
      title: "Trust",
      description:
        "Community finance has always been built on trust. Pamoja strengthens that trust with transparent and verifiable records.",
    },
    {
      icon: Users,
      title: "Ownership",
      description:
        "Communities remain in control. Members participate, contribute and make decisions together.",
    },
    {
      icon: Landmark,
      title: "Growth",
      description:
        "A foundation designed to help local savings groups evolve into scalable financial networks.",
    },
  ];

  return (
    <section
      className="
        relative
        bg-[#FAF8F4]
        py-32
      "
    >

      <Container>


        {/* INTRO */}

        <div className="mx-auto max-w-4xl">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#C79A3B]
            "
          >
            Why Pamoja
          </p>


          <h2
            className="
              mt-6
              max-w-3xl
              text-5xl
              font-black
              leading-tight
              tracking-tight
              text-[#1F2937]
              lg:text-6xl
            "
          >
            Communities already know how to build wealth.
          </h2>


          <p
            className="
              mt-8
              max-w-2xl
              text-xl
              leading-9
              text-slate-600
            "
          >
            For generations, people have saved together,
            supported each other and created opportunities
            through collective finance.
          </p>


          <p
            className="
              mt-4
              max-w-2xl
              text-xl
              leading-9
              text-slate-600
            "
          >
            Pamoja provides the digital infrastructure
            that allows these communities to grow with
            transparency and confidence.
          </p>

        </div>



        {/* PRINCIPLES */}

        <div
          className="
            mt-24
            grid
            gap-10
            lg:grid-cols-3
          "
        >

          {principles.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-[#E8E2D8]
                  bg-white
                  p-10
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1F4D36]/10
                  "
                >

                  <Icon
                    className="
                      h-7
                      w-7
                      text-[#1F4D36]
                    "
                  />

                </div>


                <h3
                  className="
                    mt-8
                    text-3xl
                    font-black
                    text-[#1F2937]
                  "
                >
                  {item.title}
                </h3>


                <p
                  className="
                    mt-5
                    text-lg
                    leading-8
                    text-slate-600
                  "
                >
                  {item.description}
                </p>


              </div>

            );

          })}

        </div>


      </Container>

    </section>
  );
}