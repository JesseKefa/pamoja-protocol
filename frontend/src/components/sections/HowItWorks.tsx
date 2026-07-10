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
    title: "Create a Community",
    description:
      "Start a savings group, investment club or cooperative in minutes.",
  },
  {
    icon: UserPlus,
    title: "Invite Members",
    description:
      "Members join securely and participate transparently.",
  },
  {
    icon: Wallet,
    title: "Contribute Together",
    description:
      "Monthly contributions are recorded securely on-chain.",
  },
  {
    icon: TrendingUp,
    title: "Grow Wealth",
    description:
      "Track treasury growth, governance and community progress in real time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-28">
      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <p className="font-semibold uppercase tracking-[0.2em] text-[#C79A3B]">
            HOW IT WORKS
          </p>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            Simple enough for anyone.
            <br />
            Powerful enough for every community.
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Whether you're managing a neighbourhood savings group,
            an investment club or a cooperative,
            Pamoja provides the infrastructure to do it securely.
          </p>

        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-200 bg-[#F8F6F2] p-8 transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1F4D36] text-white">
                  <Icon size={30} />
                </div>

                <span className="text-sm font-semibold uppercase tracking-widest text-[#C79A3B]">
                  Step {index + 1}
                </span>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
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