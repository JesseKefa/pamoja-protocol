import Container from "../ui/Container";
import {
  PlusCircle,
  UserPlus,
  Wallet,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: PlusCircle,
    title: "Create",
    description:
      "Start a digital community and establish your financial foundation.",
  },
  {
    icon: UserPlus,
    title: "Connect",
    description:
      "Invite members and build a trusted network around shared goals.",
  },
  {
    icon: Wallet,
    title: "Contribute",
    description:
      "Save together with transparent records secured on-chain.",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description:
      "Manage community wealth and unlock future financial opportunities.",
  },
];


export default function HowItWorks() {
  return (
    <section
      className="
        bg-[#FFF9EE]
        py-32
      "
    >

      <Container>


        {/* HEADER */}

        <div className="max-w-4xl">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#C79A3B]
            "
          >
            How it works
          </p>


          <h2
            className="
              mt-6
              text-5xl
              font-black
              leading-tight
              tracking-tight
              text-[#1F2937]
              lg:text-6xl
            "
          >
            From a simple idea
            <br />
            to a thriving community.
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
            Pamoja transforms traditional community
            savings into a transparent digital experience
            built around trust and collective growth.
          </p>

        </div>



        {/* TIMELINE */}

        <div
          className="
            relative
            mt-24
            grid
            gap-12
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {/* LINE */}

          <div
            className="
              absolute
              left-0
              right-0
              top-10
              hidden
              h-px
              bg-[#DCCFB7]
              xl:block
            "
          />


          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="
                  relative
                "
              >

                {/* NUMBER */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1F4D36]
                    text-white
                    shadow-lg
                  "
                >
                  <Icon size={32}/>
                </div>



                <p
                  className="
                    mt-8
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#C79A3B]
                  "
                >
                  Step {index + 1}
                </p>



                <h3
                  className="
                    mt-3
                    text-3xl
                    font-black
                    text-[#1F2937]
                  "
                >
                  {step.title}
                </h3>



                <p
                  className="
                    mt-4
                    text-lg
                    leading-8
                    text-slate-600
                  "
                >
                  {step.description}
                </p>


              </div>

            );

          })}


        </div>


      </Container>

    </section>
  );
}