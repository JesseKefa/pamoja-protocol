import Container from "../ui/Container";
import Card from "../ui/Card";
import { ShieldCheck, Users, Landmark } from "lucide-react";

export default function WhyPamoja() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Transparent",
      description:
        "Every contribution, treasury movement and governance action is recorded on-chain for every member to verify.",
    },
    {
      icon: Users,
      title: "Community Owned",
      description:
        "Communities manage themselves. Members approve participants, contribute together and grow wealth collectively.",
    },
    {
      icon: Landmark,
      title: "Built for Growth",
      description:
        "From neighbourhood savings groups to investment clubs and cooperatives, Pamoja scales with your community.",
    },
  ];

  return (
    <section className="bg-white py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          <p className="font-semibold uppercase tracking-[0.2em] text-[#C79A3B]">
            WHY PAMOJA
          </p>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            Modern infrastructure for trusted community finance.
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Communities have built wealth together for generations.
            Pamoja combines that trusted model with blockchain
            technology to create transparency, accountability
            and long-term financial growth.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F4D36]/10">
                  <Icon className="h-7 w-7 text-[#1F4D36]" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}