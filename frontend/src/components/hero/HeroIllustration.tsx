"use client";

import { motion } from "framer-motion";

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

const nodeDelays = [0.4, 1.2, 2.1, 0.8, 1.7, 2.4];

export default function HeroIllustration() {
  const radius = 210;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* ROTATING COMMUNITY RINGS */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-0
        "
      >
        <BasketRing
          size={480}
          opacity={0.3}
        />
      </motion.div>

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-0
        "
      >
        <BasketRing
          size={340}
          opacity={0.22}
        />
      </motion.div>

      <BasketRing
        size={220}
        opacity={0.16}
      />

      {/* NETWORK CONNECTIONS */}

      <svg
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        viewBox="0 0 560 560"
      >
        {nodes.map((node, index) => {
          const x =
            280 +
            radius *
              Math.cos(
                (node.angle * Math.PI) / 180
              );

          const y =
            280 +
            radius *
              Math.sin(
                (node.angle * Math.PI) / 180
              );

          return (
            <g key={node.label}>
              {/* MAIN LINE */}

              <motion.line
                x1="280"
                y1="280"
                x2={x}
                y2={y}
                stroke="#C79A3B"
                strokeWidth="1"
                initial={{
                  opacity: 0.05,
                }}
                animate={{
                  opacity: [0.05, 0.25, 0.05],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              {/* MOVING DATA */}

              <motion.circle
                r="3"
                fill="#C79A3B"
                animate={{
                  cx: [280, x],
                  cy: [280, y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: nodeDelays[index],
                  ease: "linear",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* CENTER PROTOCOL */}

      <Floating
        duration={10}
        distance={5}
      >
        <div
          className="
            absolute
            left-[280px]
            top-[280px]
            z-30
            flex
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#1F4D36]
            shadow-[0_20px_80px_rgba(31,77,54,0.45)]
          "
        >
          {/* BREATHING GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
              absolute
              h-44
              w-44
              rounded-full
              bg-[#C79A3B]
              blur-3xl
            "
          />

          <div
            className="
              absolute
              inset-2
              rounded-full
              border
              border-[#DCCFB7]/40
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

      {/* COMMUNITY NODES */}

      {nodes.map((node) => {
        const Icon = node.icon;

        const x =
          280 +
          radius *
            Math.cos(
              (node.angle * Math.PI) / 180
            );

        const y =
          280 +
          radius *
            Math.sin(
              (node.angle * Math.PI) / 180
            );

        return (
          <Floating
            key={node.label}
            duration={node.duration}
            distance={6}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="
                absolute
                -translate-x-1/2
                -translate-y-1/2
              "
              style={{
                left: x,
                top: y,
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
                  shadow-xl
                  backdrop-blur
                  transition
                  hover:border-[#C79A3B]
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
            </motion.div>
          </Floating>
        );
      })}
    </div>
  );
}