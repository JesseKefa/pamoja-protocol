"use client";

import { motion } from "framer-motion";
import { Landmark, Users, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "120+",
    label: "Communities",
  },
  {
    icon: Landmark,
    value: "KES 18M",
    label: "Saved",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "On-chain",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-4">

      {stats.map((stat, i) => {

        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + i * 0.15,
            }}
            className="
              rounded-3xl
              border
              border-[#E8E2D8]
              bg-white/70
              p-5
              backdrop-blur-xl
              shadow-sm
            "
          >
            <Icon
              size={20}
              className="mb-3 text-[#1F4D36]"
            />

            <h3 className="text-2xl font-black text-slate-900">
              {stat.value}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {stat.label}
            </p>

          </motion.div>
        );

      })}

    </div>
  );
}