"use client";

import { ShieldCheck, Handshake, Globe2 } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Smart Contract Secured",
  },
  {
    icon: Handshake,
    title: "Community Owned",
  },
  {
    icon: Globe2,
    title: "Built for African Communities",
  },
];

export default function HeroTrustBar() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-6">

      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F4D36]/10">
              <Icon
                size={18}
                className="text-[#1F4D36]"
              />
            </div>

            <span className="text-sm font-medium text-slate-700">
              {item.title}
            </span>

            {index !== items.length - 1 && (
              <div className="ml-2 hidden h-6 w-px bg-[#DCCFB7] md:block" />
            )}
          </div>
        );
      })}

    </div>
  );
}