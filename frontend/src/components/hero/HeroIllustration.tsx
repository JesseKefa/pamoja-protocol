"use client";

import Floating from "@/components/animations/Floating";
import BasketRing from "./BasketRing";

import {
  Landmark,
  ShieldCheck,
  Sprout,
  Users,
  Wallet,
  PiggyBank,
} from "lucide-react";

const nodes = [
  {
    icon: PiggyBank,
    label: "Savings",
    angle: -90,
    duration: 8,
  },
  {
    icon: Landmark,
    label: "Treasury",
    angle: -30,
    duration: 9,
  },
  {
    icon: ShieldCheck,
    label: "Governance",
    angle: 30,
    duration: 8.5,
  },
  {
    icon: Wallet,
    label: "Trust",
    angle: 90,
    duration: 10,
  },
  {
    icon: Users,
    label: "Members",
    angle: 150,
    duration: 7.5,
  },
  {
    icon: Sprout,
    label: "Growth",
    angle: 210,
    duration: 9,
  },
];

export default function HeroIllustration() {
  const radius = 210;

  return (
    <div className="relative mx-auto h-[560px] w-[560px]">

      {/* Woven Rings */}

      <BasketRing
        size={480}
        opacity={0.30}
      />

      <BasketRing
        size={340}
        opacity={0.22}
      />

      <BasketRing
        size={220}
        opacity={0.16}
      />

      {/* Connection Lines */}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 560 560"
      >
        {nodes.map((node) => {
          const x =
            280 +
            radius *
              Math.cos((node.angle * Math.PI) / 180);

          const y =
            280 +
            radius *
              Math.sin((node.angle * Math.PI) / 180);

          return (
            <line
              key={node.label}
              x1="280"
              y1="280"
              x2={x}
              y2={y}
              stroke="#C79A3B"
              strokeOpacity="0.08"
              strokeWidth="1.2"
              strokeDasharray="5 6"
            />
          );
        })}
      </svg>

      {/* Center */}

      <Floating
        duration={10}
        distance={5}
      >
        <div
          className="
            absolute
            left-[280px]
            top-[280px]
            z-50
            flex
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#1F4D36]
            shadow-[0_20px_60px_rgba(31,77,54,0.35)]
          "
        >
          {/* Inner Ring */}

          <div
            className="
              absolute
              inset-2
              rounded-full
              border
              border-[#DCCFB7]/40
            "
          />

          {/* Gold Glow */}

          <div
            className="
              absolute
              h-44
              w-44
              rounded-full
              bg-[#C79A3B]/10
              blur-2xl
            "
          />

          <span
            className="
              relative
              text-6xl
              font-black
              text-white
            "
          >
            P
          </span>
        </div>
      </Floating>

      {/* Nodes */}

      {nodes.map((node) => {
        const Icon = node.icon;

        const x =
          280 +
          radius *
            Math.cos((node.angle * Math.PI) / 180);

        const y =
          280 +
          radius *
            Math.sin((node.angle * Math.PI) / 180);

        return (
          <Floating
            key={node.label}
            duration={node.duration}
            distance={5}
          >
            <div
              className="
                absolute
                -translate-x-1/2
                -translate-y-1/2
              "
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E8E2D8]
                  bg-white/95
                  shadow-lg
                  backdrop-blur
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:rotate-2
                  hover:border-[#C79A3B]
                  hover:shadow-2xl
                "
              >
                <Icon
                  size={22}
                  className="text-[#1F4D36]"
                />
              </div>

              <p
                className="
                  mt-3
                  text-center
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                {node.label}
              </p>
            </div>
          </Floating>
        );
      })}
    </div>
  );
}